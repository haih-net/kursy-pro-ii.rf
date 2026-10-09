import type { TopicMeta } from '../../catalog'

export const gmailTopic: TopicMeta = {
  id: 'gmail',
  title: 'Gmail: разбор писем и подготовка ответов',
  description:
    'Найти нужную переписку, выделить вопросы и подготовить ответ с проверкой адресатов.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Подключение Gmail и поиск нужных цепочек',
    'Черновики ответов, вложения и проверка перед отправкой',
  ],
}
