import type { TopicMeta } from '../../catalog'

export const agentTestingTopic: TopicMeta = {
  id: 'agent-testing',
  title: 'Как проверять агента и не оставлять ошибки незамеченными',
  description:
    'Подготовить набор ситуаций, увидеть причины сбоев и ограничить стоимость работы.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['advanced'],
  lessons: [
    'Обычные случаи, неоднозначные запросы и чужие инструкции',
    'Журнал действий, повторная проверка и лимиты',
  ],
}
