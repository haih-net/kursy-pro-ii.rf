import { randomUUID } from 'node:crypto'
import { resolveMx } from 'node:dns/promises'
import { domainToASCII } from 'node:url'
import type { Request } from 'express'
import { GraphQLError } from 'graphql'
import nodemailer from 'nodemailer'
import { courseModules } from '../../app/Custom/pages/ChatGptCoursePage/program'
import {
  attendanceFormats,
  audiences,
  type AudienceId,
} from '../../app/Custom/pages/ChatGptCoursePage/catalog'
import {
  getCourseTotals,
  formatCoursePrice,
} from '../../app/Custom/pages/ChatGptCoursePage/CourseBuilder/data'

const recipient = 'n.lanets@freecode.academy'
const mailDomain = domainToASCII('курсы-про-ии.рф')
export interface CourseApplicationInput {
  token: string
  message: string
  topicIds: string[]
  formatId: string
  audienceId?: string | null
  website?: string | null
}
export interface ApplicationReceipt {
  id: string
  message: string
}
export interface ApplicationChallenge {
  token: string
  waitMs: number
}
export interface CourseApplications {
  challenge(req: Request): ApplicationChallenge
  submit(
    input: CourseApplicationInput,
    req: Request,
  ): Promise<ApplicationReceipt>
}
export type MailDelivery = (text: string, id: string) => Promise<void>

// Адрес получателя фиксирован: клиент не может превратить форму в почтовый ретранслятор.
export const deliverCourseEmail: MailDelivery = async (text, id) => {
  const configuredHost = process.env.COURSE_SMTP_HOST
  const exchanges = configuredHost
    ? [{ exchange: configuredHost, priority: 0 }]
    : (await resolveMx(recipient.split('@')[1])).sort(
        (a, b) => a.priority - b.priority,
      )
  if (!exchanges.length) {
    throw new Error('MAIL_UNAVAILABLE')
  }
  // Повтор после неопределённого результата DATA не запускаем: письмо могло уже быть принято.
  const host = exchanges[0].exchange
  const port = Number(
    process.env.COURSE_SMTP_PORT || (configuredHost ? 587 : 25),
  )
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    name: mailDomain,
    ...(process.env.COURSE_SMTP_USER
      ? {
          auth: {
            user: process.env.COURSE_SMTP_USER,
            pass: process.env.COURSE_SMTP_PASSWORD || '',
          },
        }
      : {}),
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const result = await transport.sendMail({
    from: {
      name: 'Курсы про ИИ',
      address: process.env.COURSE_MAIL_FROM || `courses@${mailDomain}`,
    },
    to: recipient,
    subject: 'Заявка на курс ChatGPT для работы',
    messageId: `<${id}@${mailDomain}>`,
    text,
  })
  if (
    !result.accepted.some(
      (address) => String(address).toLowerCase() === recipient,
    )
  ) {
    throw new Error('MAIL_REJECTED')
  }
}

function fail(message: string, code = 'BAD_USER_INPUT'): never {
  throw new GraphQLError(message, { extensions: { code } })
}
export const createCourseApplications = (
  origin: string,
  send: MailDelivery = deliverCourseEmail,
  now: () => number = Date.now,
): CourseApplications => {
  interface ChallengeState {
    address: string
    issued: number
    receipt?: ApplicationReceipt
    payload?: string
    pending?: Promise<ApplicationReceipt>
  }
  const challenges = new Map<string, ChallengeState>()
  const attempts = new Map<string, { count: number; until: number }>()
  const checkOrigin = (req: Request): string => {
    if (!origin || req.get('origin') !== origin) {
      fail('Обновите страницу и попробуйте снова.', 'FORBIDDEN')
    }
    // Не доверяем присланному посетителем X-Forwarded-For.
    return req.socket.remoteAddress || 'unknown'
  }
  const limit = (address: string, action: string, maximum: number): void => {
    for (const [key, value] of attempts) {
      if (value.until <= now()) {
        attempts.delete(key)
      }
    }
    const key = `${action}:${address}`
    const entry = attempts.get(key) || { count: 0, until: now() + 15 * 60_000 }
    entry.count += 1
    attempts.set(key, entry)
    if (entry.count > maximum) {
      fail('Слишком много попыток. Попробуйте через 15 минут.', 'RATE_LIMITED')
    }
  }
  return {
    challenge: (req) => {
      const address = checkOrigin(req)
      limit(address, 'challenge', 30)
      for (const [key, value] of challenges) {
        if (value.issued + 30 * 60_000 <= now() && !value.pending) {
          challenges.delete(key)
        }
      }
      if (challenges.size >= 5000) {
        fail('Попробуйте немного позже.', 'RATE_LIMITED')
      }
      const token = randomUUID()
      challenges.set(token, { address, issued: now() })
      return { token, waitMs: 5000 }
    },
    submit: async (input, req) => {
      const address = checkOrigin(req)
      const state = challenges.get(input.token)
      if (
        !state ||
        state.address !== address ||
        now() - state.issued >= 30 * 60_000
      ) {
        fail(
          'Время заполнения истекло. Откройте форму заново.',
          'CHALLENGE_EXPIRED',
        )
      }
      if (now() - state.issued < 5000) {
        fail('Подождите несколько секунд перед отправкой.', 'TOO_EARLY')
      }
      if (
        input.website ||
        input.message.trim().length < 5 ||
        input.message.length > 3000
      ) {
        fail('Напишите контакты и пожелания: от 5 до 3000 символов.')
      }
      const ids = [...new Set(input.topicIds)]
      const format = attendanceFormats.find(
        (item) => item.id === input.formatId,
      )
      if (
        !ids.length ||
        ids.length !== input.topicIds.length ||
        ids.some((id) => !courseModules.some((topic) => topic.id === id)) ||
        !format ||
        (input.audienceId && !Object.hasOwn(audiences, input.audienceId))
      ) {
        fail('Проверьте выбранные темы и формат занятий.')
      }
      const payload = JSON.stringify({
        message: input.message.trim(),
        ids: ids.sort(),
        formatId: input.formatId,
        audienceId: input.audienceId || '',
      })
      if (state.payload && state.payload !== payload) {
        fail('Для новой заявки откройте форму заново.', 'CHALLENGE_EXPIRED')
      }
      if (state.receipt) {
        return state.receipt
      }
      if (state.pending) {
        return state.pending
      }
      limit(address, 'submit', 5)
      state.payload = payload
      const totals = getCourseTotals(ids, input.formatId)
      const text = `Заявка на курс «ChatGPT для работы»\nНомер: ${input.token}\nДата: ${new Date(now()).toISOString()}\nФормат: ${format.title}\nАудитория: ${input.audienceId ? audiences[input.audienceId as AudienceId].title : 'Обсудим лично'}\nТем: ${totals.stages}\nВремя: ${totals.hours} ч.\nПредварительная стоимость: ${formatCoursePrice(totals.price)}\n\nВыбранные темы:\n${courseModules
        .filter((topic) => ids.includes(topic.id))
        .map((topic) => `• ${topic.title} — ${topic.hours} ч.`)
        .join(
          '\n',
        )}\n\nКонтакты и пожелания:\n${input.message.trim()}\n\nСостав, стоимость и время занятий требуют согласования.`
      state.pending = (async () => {
        try {
          await send(text, input.token)
          const receipt = {
            id: input.token,
            message:
              'Заявка отправлена. Я свяжусь с вами по указанным контактам, чтобы согласовать программу и время.',
          }
          state.receipt = receipt
          return receipt
        } catch {
          // Не раскрываем посетителю SMTP-ответы, адреса серверов и конфигурацию.
          return fail(
            'Не удалось отправить заявку. Повторите попытку или напишите на n.lanets@freecode.academy.',
            'DELIVERY_FAILED',
          )
        } finally {
          state.pending = undefined
        }
      })()
      return state.pending
    },
  }
}
