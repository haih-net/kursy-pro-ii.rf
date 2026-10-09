import type { TopicMeta } from '../../catalog'

export const connectorsTopic: TopicMeta = {
  id: 'connectors',
  title: 'Какие бывают плагины и как их подключать',
  description:
    'Познакомиться с каталогом, установить нужный плагин и разобраться с доступом к данным.',
  hours: 4,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner', 'confident'],
  lessons: [
    'Обзор плагинов по задачам и выбор подходящего',
    'Установка, подключение аккаунта, разрешения и отключение',
  ],
}
