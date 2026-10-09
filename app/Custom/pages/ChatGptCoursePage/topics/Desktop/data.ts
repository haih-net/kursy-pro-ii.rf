import type { TopicMeta } from '../../catalog'

export const desktopTopic: TopicMeta = {
  id: 'desktop',
  title: 'Установка приложения и работа на своём компьютере',
  description:
    'Отличить настольное приложение, облачный запуск и модель, работающую локально.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Установка, вход и первая задача с локальным файлом',
    'Где выполняется работа: компьютер, облако и локальная модель',
  ],
}
