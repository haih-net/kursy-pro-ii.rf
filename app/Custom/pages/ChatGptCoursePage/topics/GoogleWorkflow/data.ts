import type { TopicMeta } from '../../catalog'

export const googleWorkflowTopic: TopicMeta = {
  id: 'google-workflow',
  title: 'Подготовка к встрече из почты, календаря и файлов',
  description:
    'Соединить три подключения в одну задачу и получить проверенный комплект материалов.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Сбор сведений к встрече из трёх сервисов',
    'Памятка участнику, вопросы и проверка полноты',
  ],
}
