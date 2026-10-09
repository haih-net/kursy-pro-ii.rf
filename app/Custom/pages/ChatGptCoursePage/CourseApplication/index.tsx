import type * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  usePrepareCourseApplicationMutation,
  useSubmitCourseApplicationMutation,
} from '../../../gql/generated'
import { courseModules } from '../program'
import { getAttendanceFormat } from '../catalog'
import { getCourseTotals, formatCoursePrice } from '../CourseBuilder/data'
import { ApplicationStyled } from './styles'
interface ApplicationProps {
  open: boolean
  onClose: () => void
  selected: readonly string[]
  formatId: string
  audienceId: string
}
const ApplicationForm: React.FC<ApplicationProps> = ({
  open,
  onClose,
  selected,
  formatId,
  audienceId,
}) => {
  const dialog = useRef<HTMLDialogElement>(null)
  const initialized = useRef(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [token, setToken] = useState('')
  const prepare = usePrepareCourseApplicationMutation<Error>()
  const submit = useSubmitCourseApplicationMutation<Error>()
  const { mutate: prepareMutation } = prepare
  const prepareForm = useCallback(() => {
    setReady(false)
    clearTimeout(timeout.current)
    prepareMutation(
      {},
      {
        onSuccess: ({ prepareCourseApplication: challenge }) => {
          if (!challenge.token) {
            return
          }
          setToken(challenge.token)
          timeout.current = setTimeout(
            () => setReady(true),
            Math.max(5000, challenge.waitMs || 5000),
          )
        },
      },
    )
  }, [prepareMutation])
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      prepareForm()
    }
  }, [prepareForm])
  useEffect(() => () => clearTimeout(timeout.current), [])
  useEffect(() => {
    if (open && !dialog.current?.open) {
      dialog.current?.showModal()
    }
    if (!open && dialog.current?.open) {
      dialog.current.close()
    }
  }, [open])
  const changeMessage = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setMessage(event.currentTarget.value),
    [],
  )
  const changeWebsite = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setWebsite(event.currentTarget.value),
    [],
  )
  const handleSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!ready || !selected.length || submit.isPending) {
        return
      }
      submit.mutate(
        {
          input: {
            token,
            message,
            website,
            topicIds: [...selected],
            formatId,
            audienceId,
          },
        },
        {
          onError: (error) => {
            if (
              (error as Error & { code?: string }).code === 'CHALLENGE_EXPIRED'
            ) {
              prepareForm()
            }
          },
        },
      )
    },
    [
      ready,
      selected,
      submit,
      token,
      message,
      website,
      formatId,
      audienceId,
      prepareForm,
    ],
  )
  const handleDialogClose = useCallback(() => {
    onClose()
    if (submit.isSuccess) {
      submit.reset()
      setMessage('')
      prepareForm()
    }
  }, [onClose, submit, prepareForm])
  const totals = getCourseTotals(selected, formatId)
  return (
    <ApplicationStyled
      ref={dialog}
      onClose={handleDialogClose}
      aria-labelledby="application-title"
    >
      <button
        className="close-dialog"
        type="button"
        onClick={onClose}
        aria-label="Закрыть форму заявки"
      >
        ×
      </button>
      {submit.isSuccess ? (
        <div className="success" role="status">
          <span className="success-icon" aria-hidden="true">
            ✓
          </span>
          <h2 id="application-title">Заявка отправлена</h2>
          <p>{submit.data.submitCourseApplication.message}</p>
          <p>Оплачивать сейчас ничего не нужно. Сначала согласуем детали.</p>
          <button className="button-primary" type="button" onClick={onClose}>
            Вернуться к программе
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">СЛЕДУЮЩИЙ ШАГ — ПОЗНАКОМИТЬСЯ</p>
          <h2 id="application-title">Записаться на занятия</h2>
          <p>
            Напишите в свободной форме ваши контакты и пожелания. Я свяжусь с
            вами, чтобы обсудить программу и время.
          </p>
          <div className="order-summary">
            <strong>{getAttendanceFormat(formatId).title}</strong>
            <span>
              Тем: {totals.stages} · {totals.hours} ч.
            </span>
            <b>{formatCoursePrice(totals.price)}</b>
            <small>Предварительный расчёт. Отправка заявки без оплаты.</small>
          </div>
          <details>
            <summary>Выбранные темы ({totals.stages})</summary>
            <ul>
              {courseModules
                .filter((topic) => selected.includes(topic.id))
                .map((topic) => (
                  <li key={topic.id}>
                    {topic.title} · {topic.hours} ч.
                  </li>
                ))}
            </ul>
          </details>
          {prepare.isError ? (
            <div role="alert">
              <p>Не удалось подготовить форму. {prepare.error.message}</p>
              <button
                type="button"
                className="button-secondary"
                onClick={prepareForm}
              >
                Попробовать снова
              </button>
            </div>
          ) : !ready ? (
            <p role="status" className="waiting">
              Готовлю форму. Она появится через несколько секунд…
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="course-contact-message">
                Ваши контакты и пожелания
              </label>
              <p className="field-help" id="contact-help">
                Telegram или Email — достаточно одного удобного способа
                связи.
              </p>
              <textarea
                id="course-contact-message"
                name="message"
                value={message}
                onChange={changeMessage}
                placeholder="Например: мой Telegram @username. Хочу разобраться с изображениями, удобно заниматься по вечерам."
                required
                minLength={5}
                maxLength={3000}
                rows={5}
                aria-describedby="contact-help"
                disabled={submit.isPending}
              />
              <div className="honey" aria-hidden="true">
                <label htmlFor="course-website">Ваш сайт</label>
                <input
                  id="course-website"
                  name="website"
                  value={website}
                  onChange={changeWebsite}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <p className="privacy-note">
                Указанные контакты я использую, чтобы ответить на эту заявку и
                согласовать занятия.
              </p>
              {submit.isError && (
                <p role="alert" className="error">
                  {submit.error.message ||
                    'Не удалось отправить заявку. Попробуйте снова.'}
                </p>
              )}
              <button
                className="button-primary"
                type="submit"
                disabled={submit.isPending || !selected.length}
              >
                {submit.isPending ? 'Отправляю…' : 'Отправить заявку →'}
              </button>
            </form>
          )}
          <p className="direct-contact">
            Или напишите мне:{' '}
            <a href="mailto:n.lanets@freecode.academy">
              n.lanets@freecode.academy
            </a>
          </p>
        </>
      )}
    </ApplicationStyled>
  )
}
export const CourseApplication: React.FC<ApplicationProps> = (props) => {
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { mutations: { retry: false } } }),
  )
  return (
    <QueryClientProvider client={client}>
      <ApplicationForm {...props} />
    </QueryClientProvider>
  )
}
