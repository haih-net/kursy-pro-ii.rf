import { courseModules } from '../program'
import { getAttendanceFormat, hourlyRate } from '../catalog'
export interface CoursePreset {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly stageIds: readonly string[]
}
export interface CourseTotals {
  readonly stages: number
  readonly hours: number
  readonly price: number | null
}
export const coursePresets: readonly CoursePreset[] = [
  {
    id: 'introduction',
    title: 'Первое знакомство',
    description:
      'Одно занятие: написать сообщение, уточнить и проверить ответ.',
    stageIds: ['course-map'],
  },
  {
    id: 'foundation',
    title: 'Уверенный старт',
    description:
      'ИИ и модели, первый диалог, постановка задачи и проверка фактов.',
    stageIds: [
      'ai-overview',
      'models',
      'course-map',
      'dialogue',
      'verification',
    ],
  },
  {
    id: 'practice',
    title: 'Инструменты для работы',
    description:
      'Документы, плагины, Google, расписания и Telegram. Для тех, кто уже умеет работать в чате.',
    stageIds: [
      'documents',
      'tool-map',
      'connectors',
      'skills',
      'gmail',
      'google-calendar',
      'google-drive',
      'google-workflow',
      'scheduled',
      'monitoring',
      'telegram',
    ],
  },
  {
    id: 'visual',
    title: 'Изображения',
    description: 'От первого запроса до редактирования и серии в одном стиле.',
    stageIds: [
      'image-basics',
      'image-brief',
      'image-editing',
      'image-series',
      'image-publishing',
    ],
  },
  {
    id: 'building',
    title: 'Сайты, сервисы и агенты',
    description:
      'Приложение, Codex, собственный сайт, API и помощник. С навыками работы в чате.',
    stageIds: [
      'desktop',
      'codex-intro',
      'project-files',
      'sites-overview',
      'site-build',
      'site-publish',
      'small-service',
      'api-integration',
      'agent-foundations',
      'agent-build',
      'agent-testing',
      'workflow',
    ],
  },
  {
    id: 'full',
    title: 'Полный курс',
    description:
      'Все разделы от знакомства с ИИ до своих инструментов и агентов.',
    stageIds: courseModules.map((topic) => topic.id),
  },
]
export const getCourseTotals = (
  stageIds: readonly string[],
  formatId = 'individual',
): CourseTotals => {
  const topics = courseModules.filter((topic) => stageIds.includes(topic.id))
  const hours = topics.reduce((sum, topic) => sum + topic.hours, 0)
  const { multiplier } = getAttendanceFormat(formatId)
  return {
    stages: topics.length,
    hours,
    price: multiplier === null ? null : hours * hourlyRate * multiplier,
  }
}
export const formatCoursePrice = (rubles: number | null): string =>
  rubles === null
    ? 'По согласованию'
    : `${new Intl.NumberFormat('ru-RU').format(rubles)} ₽`
