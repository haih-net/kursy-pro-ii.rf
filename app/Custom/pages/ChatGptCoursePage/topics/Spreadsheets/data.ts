import type { TopicMeta } from '../../catalog'

export const spreadsheetsTopic: TopicMeta = {
  id: 'spreadsheets',
  title: 'Таблицы, расчёты и наглядные выводы',
  description:
    'Разобрать список расходов или продаж, проверить расчёты и построить понятный график.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Подготовка таблицы и проверка исходных чисел',
    'Формулы, группировка и график с проверкой результата',
  ],
}
