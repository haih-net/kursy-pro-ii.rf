import type * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { CourseApplication } from '../CourseApplication'
import {
  courseModules,
  courseSections,
  courseHours,
  courseLessonCount,
} from '../program'
import {
  audiences,
  levels,
  levelOrder,
  attendanceFormats,
  getAttendanceFormat,
  hourlyRate,
  type AudienceId,
} from '../catalog'
import { topicComponents } from '../topics/registry'
import { coursePresets, formatCoursePrice, getCourseTotals } from './data'
import { BuilderStyled } from './styles'

export const CourseBuilder: React.FC = () => {
  const [params] = useSearchParams()
  const [selected, setSelected] = useState<readonly string[]>(['course-map'])
  // HTML предварительно собран без параметров URL. Применяем набор после гидратации.
  useEffect(() => {
    const preset = coursePresets.find(
      (item) => item.id === params.get('preset'),
    )
    if (preset) {
      setSelected(preset.stageIds)
    }
  }, [params])
  const [orderOpen, setOrderOpen] = useState(false)
  const openOrder = useCallback(() => setOrderOpen(true), [])
  const closeOrder = useCallback(() => setOrderOpen(false), [])
  const [audience, setAudience] = useState<AudienceId | ''>('')
  const [formatId, setFormatId] = useState('individual')
  const handleAudience = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setAudience(event.currentTarget.value as AudienceId | '')
    },
    [],
  )
  const handleFormat = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setFormatId(event.currentTarget.value)
    },
    [],
  )
  const handlePreset = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      const preset = coursePresets.find(
        (item) => item.id === event.currentTarget.dataset.preset,
      )
      if (preset) {
        setSelected(preset.stageIds)
        // Ждём обновления кратких описаний, чтобы прокрутить к новой позиции темы.
        requestAnimationFrame(() => {
          const firstTopicIndex = courseModules.findIndex((topic) =>
            preset.stageIds.includes(topic.id),
          )
          document
            .getElementById(`stage-${firstTopicIndex + 1}`)
            ?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth',
              block: 'start',
            })
        })
      }
    },
    [],
  )
  const clearSelection = useCallback((): void => setSelected([]), [])
  const handleTopic = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const id = event.currentTarget.value
      setSelected((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      )
    },
    [],
  )
  const totals = getCourseTotals(selected, formatId)
  const format = getAttendanceFormat(formatId)
  const activePreset = coursePresets.find(
    (preset) =>
      preset.stageIds.length === selected.length &&
      preset.stageIds.every((id) => selected.includes(id)),
  )
  return (
    <BuilderStyled aria-labelledby="program">
      <h2 id="program">Соберите свой курс</h2>
      <p>
        Выберите темы под свои задачи. Любую можно пропустить, включая вводную.
        У выбранных тем видно краткое содержание. Раскройте любую строку, чтобы
        посмотреть полный план, и отметьте нужное. Глубину разбора определим
        вместе по ходу занятия.
      </p>
      <div className="builder-controls">
        <label>
          Для кого подбираем примеры
          <select value={audience} onChange={handleAudience}>
            <option value="">Все аудитории</option>
            {Object.entries(audiences).map(([id, item]) => (
              <option key={id} value={id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Формат участия
          <select value={formatId} onChange={handleFormat}>
            {attendanceFormats.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
                {item.multiplier !== null ? ` · ×${item.multiplier}` : ''}
              </option>
            ))}
          </select>
        </label>
      </div>
      {audience && (
        <p>
          {audiences[audience].description} Подходящие темы отмечены; остальные
          остаются доступны.
        </p>
      )}
      <p className="price-note">
        База — {formatCoursePrice(hourlyRate)} за 60 минут. Коэффициенты групп
        предварительные: 2–5 человек ×1,5; 6–10 ×2. Цена за всю группу, а не за
        участника. Для группы больше 10 человек отдельно обсуждаем состав,
        разделение по опыту и стоимость.
      </p>
      <div className="presets" role="group" aria-label="Готовые варианты курса">
        {coursePresets.map((preset) => {
          const presetTotals = getCourseTotals(preset.stageIds, formatId)
          return (
            <button
              type="button"
              className="preset"
              key={preset.id}
              aria-pressed={activePreset?.id === preset.id}
              data-preset={preset.id}
              onClick={handlePreset}
            >
              <span className="preset-title">{preset.title}</span>
              <span className="preset-description">{preset.description}</span>
              <span>
                {presetTotals.hours} ч. · тем: {presetTotals.stages}
              </span>
              <strong>{formatCoursePrice(presetTotals.price)}</strong>
            </button>
          )
        })}
      </div>
      <div
        className="selection-summary"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <span>Ваша программа</span>
          <strong>
            {selected.length
              ? (activePreset?.title ?? 'Свой вариант')
              : 'Темы не выбраны'}
          </strong>
          <span>Тем: {totals.stages}</span>
        </div>
        <div>
          <span>Время занятий</span>
          <strong data-testid="selected-hours">{totals.hours} ч.</strong>
          <span>Обычные часы по 60 минут</span>
        </div>
        <div>
          <span>{format.title}</span>
          <strong className="total-price" data-testid="selected-price">
            {formatCoursePrice(totals.price)}
          </strong>
        </div>
        <div>
          <span>Расчёт</span>
          <strong>
            {format.multiplier === null
              ? 'Состав и стоимость обсуждаем лично'
              : `${totals.hours} ч. × ${formatCoursePrice(hourlyRate)} × ${format.multiplier}`}
          </strong>
        </div>
      </div>
      <div className="order-action">
        <button
          className="button-primary"
          type="button"
          onClick={openOrder}
          disabled={!selected.length}
        >
          Записаться на выбранные темы ↗
        </button>
        <span>Без оплаты сейчас. Сначала обсудим детали.</span>
      </div>
      <p>
        Полная программа — {courseHours} часов: {courseLessonCount} занятий по
        два обычных часа. Темы занимают от 2 до 6 часов; внутри каждой есть план
        занятий. Часы и стоимость указаны за тему целиком. Цветная линия слева
        показывает сложность каждого фрагмента. На чём остановиться подробнее,
        решим вместе.
      </p>
      <div className="selection-actions">
        <span>Отметьте темы или начните с готового варианта выше.</span>
        <button
          type="button"
          onClick={clearSelection}
          disabled={!selected.length}
        >
          Очистить выбор
        </button>
      </div>
      {!selected.length && (
        <p>
          Отметьте хотя бы одну тему, чтобы рассчитать стоимость выбранной
          программы.
        </p>
      )}
      <div className="stages">
        {courseSections.map((section, sectionIndex) => (
          <section
            className="course-section"
            key={section.id}
            aria-labelledby={`section-${section.id}`}
          >
            <h3 id={`section-${section.id}`}>
              {sectionIndex + 1}. {section.title}{' '}
              <span>
                · {section.topics.reduce((sum, topic) => sum + topic.hours, 0)}{' '}
                ч.
              </span>
            </h3>

            {section.topics.map((topic) => {
              const index = courseModules.indexOf(topic)
              const Content = topicComponents[topic.id]
              const isSelected = selected.includes(topic.id)
              return (
                <div
                  className="stage-row"
                  key={topic.id}
                  data-selected={isSelected}
                  data-levels={levelOrder
                    .filter((level) => topic.levels.includes(level))
                    .join(' ')}
                >
                  <label className="stage-selection">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      value={topic.id}
                      onChange={handleTopic}
                      aria-label={`Включить тему ${index + 1}: ${topic.title}`}
                    />
                  </label>
                  <details
                    className="stage"
                    id={`stage-${index + 1}`}
                    data-topic-id={topic.id}
                  >
                    <summary>
                      <span className="stage-heading">
                        {index + 1}. {topic.title}
                      </span>
                      <span className="stage-meta">
                        <strong>{topic.hours} ч.</strong>
                      </span>
                      <span className="level-badges" aria-label="Уровни темы">
                        {topic.levels.map((id) => (
                          <span
                            className="level-badge"
                            data-level={id}
                            key={id}
                          >
                            {levels[id].title}
                          </span>
                        ))}
                      </span>
                      {audience && topic.audiences.includes(audience) && (
                        <span className="audience-match">
                          Подходит вашей аудитории
                        </span>
                      )}
                      <span className="expand-hint">
                        <span className="when-closed">Подробнее +</span>
                        <span className="when-open">Свернуть −</span>
                      </span>
                      <span className="stage-description">
                        {isSelected && <strong>В программе · </strong>}
                        {topic.description}
                      </span>
                    </summary>
                    <div className="stage-body">
                      <Content />
                    </div>
                  </details>
                </div>
              )
            })}
          </section>
        ))}
      </div>
      <div className="builder-end">
        <div>
          <span>Ваш выбор · тем: {totals.stages}</span>
          <strong>
            {totals.hours} ч. · {formatCoursePrice(totals.price)}
          </strong>
        </div>
        <button
          className="button-primary"
          type="button"
          onClick={openOrder}
          disabled={!selected.length}
        >
          Оформить заявку ↗
        </button>
        <a className="back-to-program" href="#program">
          К настройкам ↑
        </a>
      </div>
      <p className="end-note">
        Можно начать с одной темы. Оставьте контакты и пожелания — я свяжусь с
        вами, чтобы согласовать состав и время занятий.
      </p>
      <CourseApplication
        open={orderOpen}
        onClose={closeOrder}
        selected={selected}
        formatId={formatId}
        audienceId={audience}
      />
    </BuilderStyled>
  )
}
