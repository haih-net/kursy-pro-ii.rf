import type { TopicMeta } from '../../catalog'

export const imagePublishingTopic: TopicMeta = {
  id: 'image-publishing',
  title: 'Подготовка изображений для сайта и публикаций',
  description:
    'Проверить размер, обрезку, прозрачность и читаемость на реальном месте размещения.',
  hours: 2,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident'],
  lessons: ['Экспорт, варианты размеров и проверка в макете'],
}
