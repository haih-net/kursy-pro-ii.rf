import type { TopicMeta } from '../../catalog'

export const documentsTopic: TopicMeta = {
  id: 'documents',
  title: 'Как разобрать длинный документ и переписку',
  description:
    'Собрать решения, сроки и вопросы из нескольких материалов и подготовить проверенный ответ.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident'],
  lessons: [
    'Чтение файлов, страниц и таблиц без пропусков',
    'Договорённости из заметок и писем: поиск расхождений',
    'Проверенная сводка и ответ на её основе',
  ],
}
