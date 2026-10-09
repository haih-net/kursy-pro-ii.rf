import type { TopicMeta } from '../../catalog'

export const scheduledTopic: TopicMeta = {
  id: 'scheduled',
  title: 'Scheduled: разовые, отложенные и повторяющиеся задачи',
  description:
    'Настроить напоминание или регулярную работу и проверить первый запуск.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Разовая задача: дата, время, часовой пояс и уведомление',
    'Повторяющаяся задача: инструкция, первый запуск, изменение и остановка',
  ],
}
