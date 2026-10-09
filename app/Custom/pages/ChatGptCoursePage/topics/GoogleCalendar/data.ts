import type { TopicMeta } from '../../catalog'

export const googleCalendarTopic: TopicMeta = {
  id: 'google-calendar',
  title: 'Google Calendar: встречи без путаницы во времени',
  description:
    'Найти свободное время, подготовить событие и проверить изменения в календаре.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Даты, часовые пояса и поиск времени встречи',
    'Создание, перенос и отмена учебного события',
  ],
}
