import type { TopicMeta } from '../../catalog'

export const smallServiceTopic: TopicMeta = {
  id: 'small-service',
  title: 'Простой сервис для себя: список задач или заявок',
  description:
    'Создать приложение, которое сохраняет записи и позволяет их менять.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Поля, действия и правила небольшого сервиса',
    'Сохранение данных, редактирование и проверка ввода',
    'Ошибки, повторный запуск и проверка доступа',
  ],
}
