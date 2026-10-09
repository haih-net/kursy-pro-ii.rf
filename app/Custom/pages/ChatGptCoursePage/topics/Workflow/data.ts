import type { TopicMeta } from '../../catalog'

export const workflowTopic: TopicMeta = {
  id: 'workflow',
  title: 'Как внедрить помощника в свою работу или команду',
  description:
    'Собрать итоговый сценарий, распределить ответственность и оценить весь затраченный труд.',
  hours: 4,
  audiences: ['specialist', 'lead', 'technical'],
  levels: ['advanced'],
  lessons: [
    'Итоговая сборка: документы, инструменты и проверяемый результат',
    'Передача коллеге, сбой и оценка пользы',
  ],
}
