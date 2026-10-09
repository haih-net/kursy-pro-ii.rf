import type { TopicMeta } from '../../catalog'

export const agentFoundationsTopic: TopicMeta = {
  id: 'agent-foundations',
  title: 'Чем ИИ-агент отличается от языковой модели',
  description:
    'Разобрать цель, инструкции, инструменты, память и цикл выполнения задачи.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'LLM и система вокруг неё: из чего состоит агент',
    'Агент, сценарий и чат: сравнение на одной задаче',
  ],
}
