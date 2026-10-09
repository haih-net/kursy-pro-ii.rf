import type { TopicMeta } from '../../catalog'

export const googleDriveTopic: TopicMeta = {
  id: 'google-drive',
  title: 'Google Drive, Docs, Sheets и Slides в рабочей задаче',
  description:
    'Найти актуальный файл, использовать его содержимое и проверить сохранённые изменения.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Поиск файлов, версий и доступов на Google Drive',
    'Работа с документом, таблицей и презентацией через доступные инструменты',
  ],
}
