import { afterEach, describe, expect, test, vi } from 'vitest'
import express from 'express'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Server } from 'node:http'
import {
  createNotificationsRouter,
  parseApplication,
  validSubscription,
} from './applications'

const body = {
  name: 'Тест',
  contact: 'test@example.org',
  comment: '',
  slotId: '',
  stages: 'course-map',
  requestId: '11111111-1111-4111-8111-111111111111',
  consent: 'on',
  website: '',
}
const subscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/test',
  keys: { auth: 'a'.repeat(22), p256dh: 'b'.repeat(87) },
}
const resources: { server: Server; directory: string }[] = []
afterEach(async () => {
  for (const { server, directory } of resources.splice(0)) {
    await new Promise<void>((resolve) => server.close(() => resolve()))
    await rm(directory, { recursive: true, force: true })
  }
})
const setup = async (configured = true, failTelegram = false) => {
  const directory = await mkdtemp(join(tmpdir(), 'course-notifications-test-'))
  const telegram = failTelegram
    ? vi.fn().mockRejectedValue(new Error('offline'))
    : vi.fn().mockResolvedValue(undefined)
  const push = vi.fn().mockResolvedValue(undefined)
  const ownerToken = 'x'.repeat(64)
  const app = express()
  app.use(
    '/api',
    createNotificationsRouter(
      {
        directory,
        origin: 'http://course.test',
        ownerToken,
        telegramToken: configured ? 'fake' : '',
        telegramChat: configured ? 'fake-chat' : '',
        publicKey: 'fake',
        privateKey: 'fake',
        subject: 'https://course.test',
      },
      { telegram, push },
    ),
  )
  const server = app.listen(0, '127.0.0.1')
  await new Promise<void>((resolve) => server.once('listening', resolve))
  resources.push({ server, directory })
  const address = server.address()
  if (!address || typeof address === 'string') {
    throw new Error('Missing port')
  }
  const request = (
    path: string,
    data?: unknown,
    authenticated = false,
    origin = 'http://course.test',
  ) =>
    fetch(`http://127.0.0.1:${address.port}/api${path}`, {
      method: data === undefined ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
        ...(authenticated ? { Authorization: `Bearer ${ownerToken}` } : {}),
      },
      body: data === undefined ? undefined : JSON.stringify(data),
    })
  return { request, telegram, push, directory }
}

describe('Заявки и уведомления', () => {
  test('заявка сохраняет аудиторию, формат, уровень и серверный расчёт', () => {
    const selection = {
      ...body,
      stages: 'workflow',
      format: 'corporate',
      audience: 'lead',
      levels: 'workflow:advanced',
    }
    const result = parseApplication(selection)
    expect(result?.text).toContain('Команда 6–10 человек')
    expect(result?.text).toContain('Руководители и команды')
    expect(result?.text).toContain('Сложный')
    expect(result?.text).toContain('16 000 ₽')
    expect(
      parseApplication({ ...selection, levels: 'workflow:invented' }),
    ).toBeNull()
    expect(parseApplication({ ...selection, format: 'free' })).toBeNull()
  })
  test('контакты, согласие и темы проверяются; прежние окна больше не принимаются', () => {
    expect(parseApplication(body)).not.toBeNull()
    expect(parseApplication({ ...body, consent: '' })).toBeNull()
    expect(parseApplication({ ...body, contact: '' })).toBeNull()
    expect(parseApplication({ ...body, stages: 'invented' })).toBeNull()
    expect(parseApplication({ ...body, slotId: '2026-10-12-10' })).toBeNull()
    expect(parseApplication({ ...body, website: 'spam' })).toBeNull()
    expect(validSubscription(subscription)).toBe(true)
    expect(
      validSubscription({
        ...subscription,
        endpoint: 'https://127.0.0.1/private',
      }),
    ).toBe(false)
    expect(
      validSubscription({
        ...subscription,
        endpoint: 'https://fcm.googleapis.com.attacker.org/send',
      }),
    ).toBe(false)
  })
  test('старый приём закрыт и не обходит GraphQL-защиту', async () => {
    const { request, telegram, push } = await setup()
    expect((await request('/owner')).status).toBe(401)
    expect((await request('/owner/subscriptions', subscription)).status).toBe(
      401,
    )
    expect(
      (await request('/applications', body, false, 'https://foreign.test'))
        .status,
    ).toBe(403)
    const response = await request('/applications', body)
    expect(response.status).toBe(410)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(telegram).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })
  test('закрытый кабинет сохраняет подписки и проверку прежних каналов', async () => {
    const { request, telegram, push } = await setup()
    expect(
      (await request('/owner/subscriptions', subscription, true)).status,
    ).toBe(200)
    expect((await request('/owner/test', {}, true)).status).toBe(200)
    expect(telegram).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledOnce()
  })
})
