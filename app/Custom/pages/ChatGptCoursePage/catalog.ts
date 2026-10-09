export const audiences = {
  personal: {
    title: 'Для личных задач',
    description:
      'Разобраться с нуля, учиться, писать письма и принимать бытовые решения.',
  },
  specialist: {
    title: 'Специалисты и менеджеры',
    description:
      'Готовить документы, вести переписку, собирать информацию для работы.',
  },
  lead: {
    title: 'Руководители и команды',
    description:
      'Договориться о качестве, доступах и правилах применения ИИ в компании.',
  },
  technical: {
    title: 'Технические специалисты',
    description:
      'Разработчики и аналитики: разбирать ограничения и выстраивать проверяемые процессы.',
  },
} as const
export type AudienceId = keyof typeof audiences
export const levels = {
  beginner: {
    title: 'Базовый',
    description:
      'Зелёная полоса — первые шаги с объяснением с нуля. Опыт работы с ChatGPT не нужен.',
  },
  confident: {
    title: 'Средний',
    description:
      'Оранжевая полоса — несколько условий или источников. Нужно уже уметь общаться с чатом и проверять его ответы.',
  },
  advanced: {
    title: 'Сложный',
    description:
      'Фиолетовая полоса — действия с данными и работа команды. Нужно учитывать последствия ошибок и распределять ответственность.',
  },
} as const
export type LevelId = keyof typeof levels
export const levelOrder: readonly LevelId[] = [
  'beginner',
  'confident',
  'advanced',
]
export interface TopicMeta {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly hours: number
  readonly lessons: readonly string[]
  readonly audiences: readonly AudienceId[]
  readonly levels: readonly LevelId[]
}
export interface CourseSection {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly topics: readonly TopicMeta[]
}
export interface AttendanceFormat {
  readonly id: string
  readonly title: string
  readonly multiplier: number | null
}
export const hourlyRate: number = 2000
// Предварительные коэффициенты группового занятия; цена за всю группу.
export const attendanceFormats: readonly AttendanceFormat[] = [
  { id: 'individual', title: 'Индивидуально', multiplier: 1 },
  { id: 'small-group', title: 'Группа 2–5 человек', multiplier: 1.5 },
  { id: 'corporate', title: 'Команда 6–10 человек', multiplier: 2 },
  { id: 'large-group', title: 'Больше 10 человек', multiplier: null },
]
export const getAttendanceFormat = (id: string): AttendanceFormat =>
  attendanceFormats.find((format) => format.id === id) ?? attendanceFormats[0]
