import type { TopicMeta } from '../../catalog'

export const imageEditingTopic: TopicMeta = {
  id: 'image-editing',
  title: 'Редактирование картинки и работа с образцами',
  description:
    'Изменить выбранную деталь, сохранив остальное, и использовать референсы осмысленно.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Образец, исходное изображение и точная инструкция на изменение',
    'Фон, предметы, надписи и проверка побочных изменений',
  ],
}
