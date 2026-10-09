import type { TopicMeta } from '../../catalog'

export const apiIntegrationTopic: TopicMeta = {
  id: 'api-integration',
  title: 'Как подключить внешнюю функцию через API',
  description:
    'Понять запрос и ответ, хранить ключ доступа и добавить одну функцию к своему сервису.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'API, адрес запроса, параметры и ответ на простом примере',
    'Вызов модели из сервиса и защита ключа доступа',
    'Ошибки, ограничения, расходы и проверка результата',
  ],
}
