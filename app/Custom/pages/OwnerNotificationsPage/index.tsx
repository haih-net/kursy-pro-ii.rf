import type * as React from 'react'
import { useCallback, useState } from 'react'
import { OwnerNotificationsStyled } from './styles'

interface OwnerState {
  publicKey: string
  pushConfigured: boolean
  telegramConfigured: boolean
  subscriptions: number
  applications: {
    id: string
    createdAt: string
    text: string
    telegram: boolean
    browser: boolean
  }[]
}

export const OwnerNotificationsPage: React.FC = () => {
  const [token, setToken] = useState('')
  const [state, setState] = useState<OwnerState | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const api = useCallback(
    async (path: string, body?: unknown): Promise<Response> => {
      const response = await fetch(`/api/owner${path}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
      if (!response.ok) {
        const error = (await response.json()) as { message?: string }
        throw new Error(error.message || 'Ошибка запроса')
      }
      return response
    },
    [token],
  )
  const changeToken = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setToken(event.target.value)
      setState(null)
    },
    [],
  )
  const refresh = useCallback(async (): Promise<void> => {
    setBusy(true)
    try {
      setState((await (await api('')).json()) as OwnerState)
      setMessage('Состояние обновлено.')
    } catch (error) {
      setMessage((error as Error).message)
      setState(null)
    } finally {
      setBusy(false)
    }
  }, [api])
  const login = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>): void => {
      event.preventDefault()
      void refresh()
    },
    [refresh],
  )
  const subscribe = useCallback(async (): Promise<void> => {
    setBusy(true)
    try {
      if (
        !('serviceWorker' in navigator) ||
        !('PushManager' in window) ||
        !window.isSecureContext
      ) {
        throw new Error('Нужен браузер с Web Push и HTTPS (либо localhost).')
      }
      if (!state?.pushConfigured) {
        throw new Error('Серверные ключи Push ещё не настроены.')
      }
      if ((await Notification.requestPermission()) !== 'granted') {
        throw new Error(
          'Разрешите уведомления для этого сайта в настройках браузера.',
        )
      }
      await navigator.serviceWorker.register('/owner-push-sw.js')
      const registration = await navigator.serviceWorker.ready
      const subscription =
        (await registration.pushManager.getSubscription()) ||
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: state.publicKey,
        }))
      await api('/subscriptions', subscription.toJSON())
      setState((await (await api('')).json()) as OwnerState)
      setMessage(
        'Браузер подключён. Нажмите «Проверить оба канала» и убедитесь, что уведомления пришли.',
      )
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setBusy(false)
    }
  }, [api, state])
  const send = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      const path = event.currentTarget.dataset.path
      if (!path) {
        return
      }
      setBusy(true)
      try {
        const result = (await (await api(path, {})).json()) as {
          message: string
        }
        setMessage(result.message)
        setState((await (await api('')).json()) as OwnerState)
      } catch (error) {
        setMessage((error as Error).message)
      } finally {
        setBusy(false)
      }
    },
    [api],
  )
  const logout = useCallback((): void => {
    setToken('')
    setState(null)
    setMessage('Ключ удалён из памяти этой страницы.')
  }, [])
  return (
    <OwnerNotificationsStyled>
      <h1 tabIndex={-1}>Уведомления преподавателя</h1>
      <p>
        Закрытый просмотр заявок и подключение браузера. Ключ доступа хранится
        только в памяти открытой страницы.
      </p>
      <form onSubmit={login}>
        <label>
          Ключ преподавателя
          <input
            type="password"
            value={token}
            onChange={changeToken}
            required
            autoComplete="off"
          />
        </label>
        <button disabled={busy}>Открыть заявки</button>
      </form>
      <p role="status">{message}</p>
      {state && (
        <>
          <p>
            Telegram: {state.telegramConfigured ? 'настроен' : 'не подключён'}.
            Push: {state.pushConfigured ? 'настроен' : 'не подключён'}.
            Подписанных браузеров: {state.subscriptions}.
          </p>
          <p>
            Push может приходить при закрытой вкладке. Доставка зависит от
            браузера, разрешений, сети и настроек системы. Принятие push-службой
            не подтверждает показ уведомления на устройстве.
          </p>
          <p>
            <button type="button" onClick={subscribe} disabled={busy}>
              Подключить этот браузер
            </button>{' '}
            <button
              type="button"
              data-path="/test"
              onClick={send}
              disabled={busy}
            >
              Проверить оба канала
            </button>
          </p>
          <p>
            <button type="button" onClick={refresh} disabled={busy}>
              Обновить заявки
            </button>{' '}
            <button
              type="button"
              data-path="/retry"
              onClick={send}
              disabled={busy}
            >
              Повторить недоставленные уведомления
            </button>{' '}
            <button type="button" onClick={logout} disabled={busy}>
              Выйти
            </button>
          </p>
          <h2>Заявки</h2>
          {!state.applications.length && <p>Заявок пока нет.</p>}
          {state.applications.map((application) => (
            <article key={application.id}>
              <h3>
                {new Date(application.createdAt).toLocaleString('ru-RU', {
                  timeZone: 'Europe/Moscow',
                })}{' '}
                МСК
              </h3>
              <p className="application-text">{application.text}</p>
              <p>
                Telegram:{' '}
                {application.telegram ? 'принято службой' : 'ожидает отправки'}.
                Браузер:{' '}
                {application.browser
                  ? 'принято push-службой'
                  : 'ожидает отправки'}
                .
              </p>
            </article>
          ))}
        </>
      )}
    </OwnerNotificationsStyled>
  )
}
