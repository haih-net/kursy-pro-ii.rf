import type { TopicMeta } from '../../catalog'

export const researchTopic: TopicMeta = {
  id: 'research',
  title: 'Как искать информацию и готовить обзор',
  description:
    'Превратить широкий вопрос в исследование с понятными источниками и выводами.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Поиск в интернете: вопрос, критерии и подбор источников',
    'Подробный обзор: сравнение вариантов и проверка выводов',
  ],
}
