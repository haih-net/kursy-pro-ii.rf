import type { TopicMeta } from '../../catalog'

export const presentationsTopic: TopicMeta = {
  id: 'presentations',
  title: 'Документ и презентация из рабочих материалов',
  description:
    'Подготовить понятный отчёт и слайды, которые можно открыть и отредактировать.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Структура отчёта, текст и иллюстрации',
    'Презентация: одна мысль на слайд, экспорт и проверка',
  ],
}
