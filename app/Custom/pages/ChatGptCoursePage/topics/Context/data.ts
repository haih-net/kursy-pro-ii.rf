import type { TopicMeta } from '../../catalog'

export const contextTopic: TopicMeta = {
  id: 'context',
  title: 'Как вести долгую задачу и не объяснять всё заново',
  description:
    'Использовать проекты, инструкции и сохранённые решения для работы в нескольких разговорах.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Проект, материалы и постоянные инструкции',
    'Продолжение работы: память, сводка и смена разговора',
  ],
}
