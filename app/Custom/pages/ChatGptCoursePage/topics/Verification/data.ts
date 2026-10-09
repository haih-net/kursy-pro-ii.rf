import type { TopicMeta } from '../../catalog'

export const verificationTopic: TopicMeta = {
  id: 'verification',
  title: 'Как проверить, не ошибся ли ChatGPT',
  description:
    'Проверить утверждения и сравнить источники с разными условиями.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Проверка факта, даты и ссылки',
    'Сопоставление нескольких источников и работа с неизвестным',
  ],
}
