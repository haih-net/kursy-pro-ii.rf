import type { TopicMeta } from '../../catalog'

export const sitePublishTopic: TopicMeta = {
  id: 'site-publish',
  title: 'Публикация сайта, обновления и проверка доступа',
  description:
    'Разместить учебный сайт, проверить его снаружи и понять, как поддерживать его дальше.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Версия для публикации, адрес и доступ посетителей',
    'Проверка после публикации, обновление и восстановление',
  ],
}
