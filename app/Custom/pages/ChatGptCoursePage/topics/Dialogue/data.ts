import type { TopicMeta } from '../../catalog'

export const dialogueTopic: TopicMeta = {
  id: 'dialogue',
  title: 'Как объяснить ChatGPT, что вам нужно',
  description:
    'Довести письмо или текст до результата и разобраться с противоречащими пожеланиями.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Понятное задание и последовательные правки письма',
    'Несколько требований: приоритеты, противоречия и проверка результата',
  ],
}
