import type { TopicMeta } from '../../catalog'

export const telegramTopic: TopicMeta = {
  id: 'telegram',
  title: 'Telegram: свой бот для уведомлений',
  description:
    'Создать учебного бота и доставить через него результат работы с ИИ.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'BotFather, токен бота и первый учебный диалог',
    'Отправка результата в свой чат и проверка доставки',
  ],
}
