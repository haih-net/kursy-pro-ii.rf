import { AuthModal } from 'app/Custom/components/Auth/AuthModal'
import type * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import {
  useCallRoomQuery,
  useCloseCallRoomMutation,
  useUpdateCallRoomMutation,
} from 'app/gql/generated'
import { useAppContext } from 'app/Custom/components/AppContext'
import { CallsStyled } from 'app/Custom/components/Calls/styles'
import { useCallMedia } from 'app/Custom/components/Calls/hooks/useCallMedia'
import type { CallSession } from 'app/Custom/components/Calls/hooks/useCallConnection'
import { DeviceControls } from 'app/Custom/components/Calls/DeviceControls'
import { ActiveCall } from 'app/Custom/components/Calls/ActiveCall'
import { JoinCallForm } from 'app/Custom/components/Calls/JoinForm'
import type { CallRoomFormData } from 'app/Custom/components/Calls/RoomForm/schema'
import { CallRoomForm } from 'app/Custom/components/Calls/RoomForm'
import { CallInvitation } from 'app/Custom/components/Calls/Invitation'
import { Button } from 'app/Custom/components/Button'
const CallRoomView: React.FC<{ id: string }> = ({ id }) => {
  const { user, userLoading } = useAppContext() ?? {}
  const { data, error, loading, refetch } = useCallRoomQuery({
    variables: { id },
    fetchPolicy: 'network-only',
    pollInterval: 15000,
  })
  const room = data?.callRoom
  const [update] = useUpdateCallRoomMutation()
  const [close, closing] = useCloseCallRoomMutation()
  const [session, setSession] = useState<CallSession | null>(null)
  const [code, setCode] = useState('')
  const [notice, setNotice] = useState('')
  const [confirmClose, setConfirmClose] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const openAuth = useCallback(() => setAuthOpen(true), [])
  const closeAuth = useCallback(() => setAuthOpen(false), [])
  const media = useCallMedia()
  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1))
    if (params.has('code')) {
      setCode(params.get('code') ?? '')
      history.replaceState(
        history.state,
        '',
        location.pathname + location.search,
      )
    }
  }, [id])
  const refresh = useCallback((): void => {
    setCode('')
    void refetch().catch(() => setNotice('Не удалось обновить настройки'))
  }, [refetch])
  const { stopAll } = media
  useEffect(() => {
    if (room?.closed) {
      stopAll()
    }
  }, [room?.closed, stopAll])
  const leave = useCallback((): void => {
    setSession(null)
    media.stopAll()
  }, [media])
  const join = useCallback((value: CallSession, accessCode: string): void => {
    setSession(value)
    setCode(accessCode)
  }, [])
  const save = useCallback(
    async (settings: CallRoomFormData): Promise<void> => {
      await update({ variables: { id, data: settings } })
      await refetch()
      if (settings.accessCode !== null && settings.accessCode !== undefined) {
        setCode(settings.accessCode)
      }
      setNotice('Настройки сохранены')
    },
    [update, id, refetch],
  )
  const endRoom = useCallback(async (): Promise<void> => {
    try {
      await close({ variables: { id } })
      leave()
      await refetch()
    } catch (err) {
      setNotice(
        err instanceof Error ? err.message : 'Не удалось завершить звонок',
      )
    }
  }, [close, id, leave, refetch])
  const cancelClose = useCallback((): void => setConfirmClose(false), [])
  const requestClose = useCallback((): void => setConfirmClose(true), [])
  if (loading && !room) {
    return (
      <CallsStyled>
        <p>Загрузка комнаты…</p>
      </CallsStyled>
    )
  }
  if (!room) {
    return (
      <CallsStyled>
        <h1>Комната недоступна</h1>
        <p role="alert">{error?.message ?? 'Комната не найдена'}</p>
        <Link to="/calls">К видеозвонкам</Link>
      </CallsStyled>
    )
  }
  return (
    <CallsStyled>
      <nav>
        <Link to="/calls">Видеозвонки</Link>
        <Link to="/calls/devices">Проверка устройств</Link>
      </nav>
      <h1 tabIndex={-1}>{room.title}</h1>
      <p>
        {room.authenticatedOnly
          ? 'Вход только для авторизованных пользователей'
          : 'Вход всем по ссылке'}
        {room.hasAccessCode ? ' · Защищено кодом' : ' · Без кода доступа'}
      </p>
      {room.closed ? (
        <p role="status">Звонок завершён. Комната закрыта.</p>
      ) : (
        <>
          {session ? (
            <ActiveCall
              session={session}
              media={media}
              onLeave={leave}
              onSettings={refresh}
            />
          ) : (
            <div className="panel">
              <h2>Войти в комнату</h2>
              {userLoading ? (
                <p>Загрузка…</p>
              ) : room.authenticatedOnly && !user ? (
                <p>
                  Для этой комнаты нужна авторизация.{' '}
                  <Button variant="secondary" onClick={openAuth}>
                    Войти в аккаунт
                  </Button>
                  . После входа приглашение останется на этой странице.
                </p>
              ) : (
                <JoinCallForm
                  roomId={id}
                  hasCode={Boolean(room.hasAccessCode)}
                  code={code}
                  name={user?.fullname || user?.username || ''}
                  onJoin={join}
                />
              )}
              <p className="hint">
                Можно войти без камеры и микрофона и включить их позже.
              </p>
            </div>
          )}
          <DeviceControls media={media} />
          <CallInvitation
            roomId={id}
            code={code}
            hasCode={Boolean(room.hasAccessCode)}
          />
          {(room.isOwner || (user?.sudo && user.status === 'active')) && (
            <details className="panel">
              <summary>Настройки комнаты</summary>
              <CallRoomForm
                key={`${room.title}:${room.authenticatedOnly}:${room.hasAccessCode}`}
                editing
                initial={{
                  title: room.title ?? '',
                  authenticatedOnly: Boolean(room.authenticatedOnly),
                }}
                onSave={save}
              />
              <div className="actions">
                {confirmClose ? (
                  <>
                    <p>Завершить звонок для всех и закрыть комнату?</p>
                    <Button
                      variant="danger"
                      disabled={closing.loading}
                      onClick={endRoom}
                    >
                      Да, завершить для всех
                    </Button>
                    <Button variant="secondary" onClick={cancelClose}>
                      Отмена
                    </Button>
                  </>
                ) : (
                  <Button variant="danger" onClick={requestClose}>
                    Завершить звонок для всех
                  </Button>
                )}
              </div>
            </details>
          )}
        </>
      )}
      {notice && <p role="status">{notice}</p>}
      <AuthModal isOpen={authOpen} onClose={closeAuth} />
    </CallsStyled>
  )
}
export const CallRoomPage: React.FC = () => {
  const { roomId = '' } = useParams()
  return <CallRoomView key={roomId} id={roomId} />
}
