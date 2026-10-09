import express, { type Request, type Response, type Router } from 'express'
import { timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import webpush, { type PushSubscription } from 'web-push'
import { courseModules } from '../../app/Custom/pages/ChatGptCoursePage/program'

import { describeSelection } from '../../app/Custom/pages/ChatGptCoursePage/selection'

interface Application {
  id: string
  createdAt: string
  text: string
  telegram: boolean
  browser: boolean
}
interface State {
  subscriptions: PushSubscription[]
  applications: Application[]
}
export interface NotificationConfig {
  origin: string
  ownerToken: string
  telegramToken: string
  telegramChat: string
  publicKey: string
  privateKey: string
  subject: string
  directory: string
}
export interface NotificationTransport {
  telegram(text: string): Promise<void>
  push(subscription: PushSubscription): Promise<void>
}

export const parseApplication = (
  body: unknown,
): { id: string; text: string } | null => {
  if (!body || typeof body !== 'object') {
    return null
  }
  const data = body as Record<string, unknown>
  const {
    name,
    contact,
    comment,
    slotId,
    stages,
    requestId,
    consent,
    website,
  } = data
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 100 ||
    typeof contact !== 'string' ||
    contact.trim().length < 3 ||
    contact.length > 200 ||
    typeof comment !== 'string' ||
    comment.length > 1500 ||
    typeof slotId !== 'string' ||
    typeof stages !== 'string' ||
    stages.length > 300 ||
    typeof requestId !== 'string' ||
    !/^[\da-f-]{36}$/i.test(requestId) ||
    consent !== 'on' ||
    website
  ) {
    return null
  }
  if (slotId) {
    return null
  }
  const ids = [...new Set(stages.split(',').filter(Boolean))]
  if (ids.some((id) => !courseModules.some((stage) => stage.id === id))) {
    return null
  }
  const formatId = data.format ?? 'individual'
  const audienceId = data.audience ?? ''
  const levelChoices = data.levels ?? ''
  if (
    typeof formatId !== 'string' ||
    typeof audienceId !== 'string' ||
    typeof levelChoices !== 'string' ||
    levelChoices.length > 500
  ) {
    return null
  }
  const selectionDescription = describeSelection(
    ids,
    formatId,
    audienceId,
    levelChoices,
  )
  if (!selectionDescription) {
    return null
  }
  return {
    id: requestId,
    text: `Заявка на курс\nИмя: ${name.trim()}\nКонтакт: ${contact.trim()}\nВремя: Согласовать лично\nЭтапы: ${
      courseModules
        .filter((stage) => ids.includes(stage.id))
        .map((stage) => stage.title)
        .join('; ') || 'Обсудить'
    }\nПрограмма: ${selectionDescription}\nПожелания: ${comment.trim()}\nНомер: ${requestId}`,
  }
}

export const validSubscription = (
  value: unknown,
): value is PushSubscription => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const { endpoint, keys } = value as Partial<PushSubscription>
  if (
    typeof endpoint !== 'string' ||
    endpoint.length > 2000 ||
    !keys ||
    typeof keys.auth !== 'string' ||
    typeof keys.p256dh !== 'string' ||
    !/^[\w-]{20,30}$/.test(keys.auth) ||
    !/^[\w-]{80,100}$/.test(keys.p256dh)
  ) {
    return false
  }
  try {
    const url = new URL(endpoint)
    // Разрешаем только браузерные push-службы, исключая произвольные серверные запросы.
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      (url.hostname === 'fcm.googleapis.com' ||
        url.hostname === 'updates.push.services.mozilla.com' ||
        url.hostname === 'web.push.apple.com' ||
        url.hostname.endsWith('.notify.windows.com'))
    )
  } catch {
    return false
  }
}

export const createNotificationsRouter = (
  config: NotificationConfig,
  transport?: NotificationTransport,
): Router => {
  const router = express.Router()
  const file = resolve(config.directory, 'notifications.json')
  let queue: Promise<unknown> = Promise.resolve()
  const serialized = <T>(operation: () => Promise<T>): Promise<T> => {
    const next = queue.then(operation)
    queue = next.catch(() => undefined)
    return next
  }
  const read = async (): Promise<State> => {
    try {
      return JSON.parse(await readFile(file, 'utf8')) as State
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { subscriptions: [], applications: [] }
      }
      throw error
    }
  }
  const save = async (state: State): Promise<void> => {
    await mkdir(config.directory, { recursive: true, mode: 0o700 })
    await writeFile(`${file}.tmp`, JSON.stringify(state), { mode: 0o600 })
    await rename(`${file}.tmp`, file)
  }
  const delivery: NotificationTransport = transport || {
    telegram: async (text) => {
      const response = await fetch(
        `https://api.telegram.org/bot${config.telegramToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: config.telegramChat, text }),
          signal: AbortSignal.timeout(10000),
        },
      )
      const result = (await response.json()) as { ok?: boolean }
      if (!response.ok || result.ok !== true) {
        throw new Error('Telegram delivery failed')
      }
    },
    push: async (subscription) => {
      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: 'Новая заявка на курс',
          body: 'Откройте кабинет преподавателя, чтобы посмотреть контакт и пожелания.',
        }),
        {
          TTL: 86400,
          timeout: 10000,
          vapidDetails: {
            subject: config.subject,
            publicKey: config.publicKey,
            privateKey: config.privateKey,
          },
        },
      )
    },
  }
  const deliver = async (
    state: State,
    application: Application,
  ): Promise<void> => {
    if (!application.telegram && config.telegramToken && config.telegramChat) {
      try {
        await delivery.telegram(application.text)
        application.telegram = true
      } catch {
        /* Статус остаётся в кабинете для повторной отправки. */
      }
    }
    if (!application.browser && config.publicKey && config.privateKey) {
      const invalid = new Set<string>()
      const results = await Promise.all(
        state.subscriptions.map(async (subscription) => {
          try {
            await delivery.push(subscription)
            return true
          } catch (error) {
            if (
              [404, 410].includes(
                (error as { statusCode?: number }).statusCode || 0,
              )
            ) {
              invalid.add(subscription.endpoint)
            }
            return false
          }
        }),
      )
      application.browser = results.some(Boolean)
      state.subscriptions = state.subscriptions.filter(
        (subscription) => !invalid.has(subscription.endpoint),
      )
    }
  }
  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  router.use(express.json({ limit: '12kb' }))
  router.use((req, res, next) => {
    if (req.method !== 'GET' && req.get('origin') !== config.origin) {
      res.status(403).json({ message: 'Недопустимый источник запроса.' })
      return
    }
    next()
  })
  const attempts = new Map<string, { count: number; until: number }>()
  router.use((req, res, next) => {
    // Лимит старого кабинета не расходуется на GraphQL-статистику и подготовку формы.
    if (req.path !== '/applications' && !req.path.startsWith('/owner')) {
      next()
      return
    }
    const now = Date.now()
    for (const [key, value] of attempts) {
      if (value.until < now) {
        attempts.delete(key)
      }
    }
    // Не доверяем произвольному X-Forwarded-For. За прокси лимит общий, его нужно дополнять на внешнем сервере.
    const key = req.socket.remoteAddress || 'unknown'
    const entry = attempts.get(key) || { count: 0, until: now + 60000 }
    entry.count += 1
    attempts.set(key, entry)
    if (entry.count > 30) {
      res
        .status(429)
        .json({ message: 'Слишком много запросов. Попробуйте через минуту.' })
      return
    }
    next()
  })
  const owner = (req: Request, res: Response, next: () => void): void => {
    const actual = Buffer.from(req.get('authorization') || '')
    const expected = Buffer.from(`Bearer ${config.ownerToken}`)
    if (
      config.ownerToken.length < 32 ||
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      res.status(401).json({ message: 'Нужен ключ преподавателя.' })
      return
    }
    next()
  }
  // Старый публичный REST-приём закрыт: все новые заявки проходят GraphQL-антиспам и уходят на email.
  router.post('/applications', (_req, res) => {
    res.status(410).json({ message: 'Откройте форму на странице курса.' })
  })
  router.use('/owner', owner)
  router.get('/owner', async (_req, res) => {
    const state = await read()
    res.json({
      publicKey: config.publicKey,
      pushConfigured: !!(
        config.publicKey &&
        config.privateKey &&
        config.subject
      ),
      telegramConfigured: !!(config.telegramToken && config.telegramChat),
      subscriptions: state.subscriptions.length,
      applications: [...state.applications].reverse(),
    })
  })
  router.post('/owner/subscriptions', async (req, res) => {
    if (!validSubscription(req.body)) {
      res.status(400).json({ message: 'Некорректная подписка браузера.' })
      return
    }
    const subscription: PushSubscription = req.body
    await serialized(async () => {
      const state = await read()
      state.subscriptions = state.subscriptions.filter(
        (entry) => entry.endpoint !== subscription.endpoint,
      )
      if (state.subscriptions.length >= 10) {
        res.status(409).json({ message: 'Достигнут предел в 10 браузеров.' })
        return
      }
      state.subscriptions.push(subscription)
      await save(state)
      res.json({ message: 'Браузер подключён.' })
    })
  })
  router.post('/owner/retry', async (_req, res) => {
    await serialized(async () => {
      const state = await read()
      for (const application of state.applications.slice(-20)) {
        await deliver(state, application)
        await save(state)
      }
      res.json({
        message:
          'Повторная отправка последних 20 заявок завершена. Проверьте статусы.',
      })
    })
  })
  router.post('/owner/test', async (_req, res) => {
    await serialized(async () => {
      const state = await read()
      const test: Application = {
        id: 'test',
        createdAt: new Date().toISOString(),
        text: 'Проверка уведомлений с сайта курсы-про-ии.рф. Это тест, не заявка.',
        telegram: false,
        browser: false,
      }
      await deliver(state, test)
      await save(state)
      res.json({
        message: `Тест: Telegram — ${test.telegram ? 'принят службой' : 'не отправлен'}, браузер — ${test.browser ? 'принят push-службой' : 'не отправлен'}.`,
      })
    })
  })
  router.use(
    (
      error: unknown,
      _req: Request,
      res: Response,
      _next: express.NextFunction,
    ) => {
      const status = (error as { status?: number }).status
      res
        .status(status === 400 || status === 413 ? status : 500)
        .json({ message: 'Не удалось обработать запрос. Повторите попытку.' })
    },
  )
  return router
}
