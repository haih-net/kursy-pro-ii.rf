import type { TopicMeta } from '../../catalog'

export const siteBuildTopic: TopicMeta = {
  id: 'site-build',
  title: 'Создание простого сайта: от идеи до работающей страницы',
  description:
    'Подготовить содержание, собрать страницу и исправить её на компьютере и телефоне.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['confident', 'advanced'],
  lessons: [
    'Задача сайта, структура и реальные материалы',
    'Первая версия в Sites и последовательные правки',
    'Мобильный вид, ссылки, доступность и проверка сценария',
  ],
}
