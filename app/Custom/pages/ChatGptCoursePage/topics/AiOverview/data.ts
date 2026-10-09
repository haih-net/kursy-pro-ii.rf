import type { TopicMeta } from '../../catalog'

export const aiOverviewTopic: TopicMeta = {
  id: 'ai-overview',
  title: 'Что такое ИИ и чем отличаются ИИ-чаты',
  description:
    'Различить модель, приложение и инструмент; сравнить ChatGPT, DeepSeek, Grok, Claude и Gemini.',
  hours: 6,
  audiences: ['personal', 'specialist', 'lead', 'technical'],
  levels: ['beginner'],
  lessons: [
    'ИИ, нейросеть и языковая модель: объяснение на обычных задачах',
    'ChatGPT, DeepSeek, Grok, Claude и Gemini: сравнение на одинаковых примерах',
    'Что добавляет приложение: история, файлы, поиск и доступные действия',
  ],
}
