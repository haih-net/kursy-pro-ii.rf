import { describe, expect, test } from 'vitest'
import {
  courseModules,
  courseSections,
  courseHours,
  courseLessonCount,
} from '../program'
import { describeSelection } from '../selection'
import { coursePresets, getCourseTotals } from './data'

describe('Почасовая стоимость программы', () => {
  test('цена зависит от часов и формата, а не от уровня', () => {
    expect(getCourseTotals(['course-map'])).toEqual({
      stages: 1,
      hours: 2,
      price: 4000,
    })
    expect(getCourseTotals(['course-map'], 'small-group').price).toBe(6000)
    expect(getCourseTotals(['course-map'], 'corporate').price).toBe(8000)
    expect(getCourseTotals(courseModules.map((topic) => topic.id)).price).toBe(
      300000,
    )
    const beginner = describeSelection(
      ['verification'],
      'corporate',
      'lead',
      'verification:beginner',
    )
    const advanced = describeSelection(
      ['verification'],
      'corporate',
      'lead',
      'verification:confident',
    )
    expect(beginner).toContain('16 000 ₽')
    expect(advanced).toContain('16 000 ₽')
  })
  test('большая группа требует согласования вместо фиктивной цены', () => {
    expect(getCourseTotals(['course-map'], 'large-group').price).toBeNull()
  })
  test('пустой выбор, повторы и неизвестные темы не дают лишних начислений', () => {
    expect(getCourseTotals([])).toEqual({ stages: 0, hours: 0, price: 0 })
    expect(getCourseTotals(['dialogue', 'dialogue', 'missing'])).toEqual(
      getCourseTotals(['dialogue']),
    )
  })
  test('нельзя заказать отсутствующий уровень или незнакомый формат', () => {
    expect(
      describeSelection(
        ['course-map'],
        'individual',
        '',
        'course-map:advanced',
      ),
    ).toBeNull()
    expect(
      describeSelection(['workflow'], 'individual', '', 'workflow:beginner'),
    ).toBeNull()
    expect(describeSelection(['course-map'], 'free', '', '')).toBeNull()
    expect(
      describeSelection(['course-map'], 'individual', 'invented', ''),
    ).toBeNull()
    expect(
      describeSelection(
        ['course-map'],
        'individual',
        '',
        'verification:confident',
      ),
    ).toBeNull()
  })
})

describe('Целостность полной программы', () => {
  test('150 часов распределены по занятиям и разделам без повторов', () => {
    expect(courseHours).toBe(150)
    expect(courseLessonCount).toBe(75)
    expect(courseSections).toHaveLength(10)
    const ids = courseModules.map((topic) => topic.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const topic of courseModules) {
      expect(topic.hours).toBe(topic.lessons.length * 2)
      expect(topic.hours).toBeGreaterThanOrEqual(2)
      expect(topic.hours).toBeLessThanOrEqual(6)
    }
    for (const preset of coursePresets) {
      expect(new Set(preset.stageIds).size).toBe(preset.stageIds.length)
      expect(preset.stageIds.every((id) => ids.includes(id))).toBe(true)
    }
  })
})
