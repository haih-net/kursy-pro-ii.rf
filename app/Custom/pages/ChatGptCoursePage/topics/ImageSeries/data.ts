import type { TopicMeta } from '../../catalog'

export const imageSeriesTopic: TopicMeta = {
  id: 'image-series',
  title: 'Серия изображений в одном стиле',
  description:
    'Подготовить несколько иллюстраций, в которых сохраняются персонаж, предмет и визуальные правила.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Общий образец и правила серии',
    'Новые сцены, сравнение вариантов и исправление расхождений',
  ],
}
