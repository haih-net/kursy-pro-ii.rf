import { describe, expect, test, vi } from 'vitest'
import type { Request } from 'express'
import { graphql } from 'graphql/index.js'
import { schema } from '../schema'
import {
  createCourseApplications,
  type CourseApplicationInput,
} from './courseApplications'
import { courseModules } from '../../app/Custom/pages/ChatGptCoursePage/program'
const request = (
  origin = 'http://course.test',
  address = '127.0.0.1',
): Request =>
  ({
    get: () => origin,
    socket: { remoteAddress: address },
  }) as unknown as Request
const setup = () => {
  let time = 1_000_000
  const send = vi.fn().mockResolvedValue(undefined)
  const service = createCourseApplications(
    'http://course.test',
    send,
    () => time,
  )
  const input: CourseApplicationInput = {
    token: service.challenge(request()).token,
    message: 'Telegram @student, удобны вечера',
    topicIds: ['course-map'],
    formatId: 'individual',
    website: '',
  }
  return {
    service,
    send,
    input,
    advance: (ms = 5000) => {
      time += ms
    },
  }
}
describe('Заявка на email через GraphQL', () => {
  test('сервер не принимает заявку до пяти секунд и затем рассчитывает программу', async () => {
    const { service, send, input, advance } = setup()
    await expect(service.submit(input, request())).rejects.toMatchObject({
      extensions: { code: 'TOO_EARLY' },
    })
    advance(4999)
    await expect(service.submit(input, request())).rejects.toMatchObject({
      extensions: { code: 'TOO_EARLY' },
    })
    advance(1)
    const receipt = await service.submit(input, request())
    expect(receipt.id).toBe(input.token)
    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0][0]).toContain('4 000 ₽')
    expect(send.mock.calls[0][0]).toContain('@student')
  })
  test('чужой источник, чужой адрес, выдуманный и просроченный токен отклоняются', async () => {
    const { service, input, advance } = setup()
    expect(() => service.challenge(request('https://foreign.test'))).toThrow()
    advance()
    await expect(
      service.submit(input, request('http://course.test', '127.0.0.2')),
    ).rejects.toThrow()
    await expect(
      service.submit({ ...input, token: 'fake' }, request()),
    ).rejects.toThrow()
    advance(30 * 60_000)
    await expect(service.submit(input, request())).rejects.toMatchObject({
      extensions: { code: 'CHALLENGE_EXPIRED' },
    })
  })
  test.each([
    { website: 'spam' },
    { message: '   ' },
    { message: 'x'.repeat(3001) },
    { topicIds: [] },
    { topicIds: ['invented'] },
    { topicIds: ['course-map', 'course-map'] },
    { formatId: 'free' },
    { audienceId: 'fake' },
  ])('не отправляет некорректную заявку %j', async (patch) => {
    const { service, send, input, advance } = setup()
    advance()
    await expect(
      service.submit({ ...input, ...patch }, request()),
    ).rejects.toThrow()
    expect(send).not.toHaveBeenCalled()
  })
  test('параллельная и повторная отправки дают одно письмо', async () => {
    const { service, send, input, advance } = setup()
    advance()
    const receipts = await Promise.all([
      service.submit(input, request()),
      service.submit(input, request()),
    ])
    expect(receipts[0]).toEqual(receipts[1])
    await service.submit(input, request())
    expect(send).toHaveBeenCalledOnce()
    await expect(
      service.submit({ ...input, message: 'другая заявка' }, request()),
    ).rejects.toThrow()
  })
  test('ошибка почты не маскируется успехом, повтор доступен', async () => {
    const { service, send, input, advance } = setup()
    advance()
    send.mockRejectedValueOnce(new Error('секретные настройки SMTP'))
    await expect(service.submit(input, request())).rejects.toMatchObject({
      extensions: { code: 'DELIVERY_FAILED' },
    })
    await expect(service.submit(input, request())).resolves.toHaveProperty('id')
    expect(send).toHaveBeenCalledTimes(2)
  })
  test('лимит срабатывает и восстанавливается после окна', async () => {
    const { service, input, advance } = setup()
    for (let i = 0; i < 5; i++) {
      const token = service.challenge(request()).token
      advance()
      await service.submit({ ...input, token }, request())
    }
    const token = service.challenge(request()).token
    advance()
    await expect(
      service.submit({ ...input, token }, request()),
    ).rejects.toMatchObject({ extensions: { code: 'RATE_LIMITED' } })
    advance(15 * 60_000)
    await expect(
      service.submit({ ...input, token }, request()),
    ).resolves.toHaveProperty('id')
  })
  test('GraphQL передаёт все темы, групповой формат и серверную сумму', async () => {
    const { service, send, input, advance } = setup()
    advance()
    const result = await graphql({
      schema,
      source:
        'mutation($input: CourseApplicationInput!) { submitCourseApplication(input: $input) { id message } }',
      variableValues: {
        input: {
          ...input,
          topicIds: courseModules.map((topic) => topic.id),
          formatId: 'corporate',
        },
      },
      contextValue: { req: request(), courseApplications: service },
    })
    expect(result.errors).toBeUndefined()
    expect(send.mock.calls[0][0]).toContain('150 ч.')
    expect(send.mock.calls[0][0]).toContain('600 000 ₽')
    expect(send.mock.calls[0][0]).toContain('Тем: 37')
  })
})
