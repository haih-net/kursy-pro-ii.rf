import type { TopicMeta } from '../../catalog'

export const modelsTopic: TopicMeta = {
  id: 'models',
  title: 'Зачем нужны разные модели и режим Thinking',
  description:
    'Понять, когда нужен быстрый ответ, а когда стоит дать модели больше времени на рассуждение.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Модель, режим и инструмент: что меняет каждый выбор',
    'Быстрый ответ и рассуждение: сравнение времени, ошибок и качества',
  ],
}
