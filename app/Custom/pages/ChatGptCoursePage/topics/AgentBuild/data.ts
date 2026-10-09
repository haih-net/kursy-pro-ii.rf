import type { TopicMeta } from '../../catalog'

export const agentBuildTopic: TopicMeta = {
  id: 'agent-build',
  title: 'Свой агент для одной полезной задачи',
  description:
    'Собрать помощника, который находит сведения, готовит результат и вовремя останавливается.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Цель, входные данные, инструменты и границы помощника',
    'Сборка агента с одним инструментом и проверка цикла',
    'Сохранение результата, уточнения и завершение работы',
  ],
}
