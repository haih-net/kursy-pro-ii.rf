import type { TopicMeta } from '../../catalog'

export const monitoringTopic: TopicMeta = {
  id: 'monitoring',
  title: 'Как следить за изменениями без лишних уведомлений',
  description:
    'Настроить проверку источника и получать сообщение только о значимом изменении.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Что считать изменением: исходное состояние и правила сравнения',
    'Повторы, ошибки доступа, журнал и прекращение наблюдения',
  ],
}
