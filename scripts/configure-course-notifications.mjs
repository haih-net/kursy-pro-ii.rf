import { randomBytes } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import webpush from 'web-push'

const keys = webpush.generateVAPIDKeys()
const content = [
  'COURSE_SITE_ORIGIN=http://localhost:3201',
  `COURSE_OWNER_TOKEN=${randomBytes(32).toString('hex')}`,
  'COURSE_TELEGRAM_BOT_TOKEN=',
  'COURSE_TELEGRAM_CHAT_ID=',
  `COURSE_PUSH_PUBLIC_KEY=${keys.publicKey}`,
  `COURSE_PUSH_PRIVATE_KEY=${keys.privateKey}`,
  'COURSE_PUSH_SUBJECT=https://xn-----xlcagzggchu2h.xn--p1ai',
  'COURSE_NOTIFICATIONS_DIRECTORY=.private',
  '',
].join('\n')
try {
  await writeFile('.env.notifications', content, { flag: 'wx', mode: 0o600 })
  console.log(
    'Создан .env.notifications. Добавьте Telegram-бота и чат, проверьте адрес сайта. Секреты не выводятся. Перезапустите сервер после изменения файла.',
  )
} catch (error) {
  if (error.code === 'EEXIST')
    console.log('Файл уже существует; ключи сохранены без изменений.')
  else throw error
}
