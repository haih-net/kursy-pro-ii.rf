import {
  audiences,
  levels,
  attendanceFormats,
  type AudienceId,
  type LevelId,
} from './catalog'
import { courseModules } from './program'
import { formatCoursePrice, getCourseTotals } from './CourseBuilder/data'
// Один контракт для перехода в календарь и проверки заявки на сервере.
export const describeSelection = (
  ids: readonly string[],
  formatId: string,
  audienceId: string,
  levelChoices: string,
): string | null => {
  const format = attendanceFormats.find((item) => item.id === formatId)
  if (!format || (audienceId && !Object.hasOwn(audiences, audienceId))) {
    return null
  }
  const choices = new Map<string, LevelId>()
  for (const pair of levelChoices.split(',').filter(Boolean)) {
    const [id, level, extra] = pair.split(':')
    const topic = courseModules.find((item) => item.id === id)
    if (
      extra ||
      !topic ||
      !ids.includes(id) ||
      !topic.levels.includes(level as LevelId) ||
      choices.has(id)
    ) {
      return null
    }
    choices.set(id, level as LevelId)
  }
  const descriptions = courseModules
    .filter((topic) => ids.includes(topic.id))
    .map(
      (topic) =>
        `${topic.title}: ${levels[choices.get(topic.id) ?? topic.levels[0]].title}`,
    )
  const totals = getCourseTotals(ids, formatId)
  return `${format.title}. ${audienceId ? audiences[audienceId as AudienceId].title : 'Аудиторию обсудим'}. ${totals.hours} ч. · ${formatCoursePrice(totals.price)}. Уровни: ${descriptions.join('; ') || 'Обсудим'}`
}
