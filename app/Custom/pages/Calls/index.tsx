import { CallRoomList } from 'app/Custom/components/Calls/RoomList'
import { AuthModal } from 'app/Custom/components/Auth/AuthModal'
import { useCallback, useState } from 'react'
import { Button } from 'app/Custom/components/Button'
import type * as React from 'react'
import { Link, useNavigate } from 'react-router'
import { useCreateCallRoomMutation } from 'app/gql/generated'
import { useAppContext } from 'app/Custom/components/AppContext'
import { CallsStyled } from 'app/Custom/components/Calls/styles'
import type { CallRoomFormData } from 'app/Custom/components/Calls/RoomForm/schema'
import { CallRoomForm } from 'app/Custom/components/Calls/RoomForm'
export const CallsPage: React.FC = () => {
  const { user, userLoading } = useAppContext() ?? {}
  const [createRoom] = useCreateCallRoomMutation()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)
  const openAuth = useCallback(() => setAuthOpen(true), [])
  const closeAuth = useCallback(() => setAuthOpen(false), [])
  const save = useCallback(
    async (data: CallRoomFormData): Promise<void> => {
      const result = await createRoom({ variables: { data } })
      const room = result.data?.createCallRoom
      if (!room?.id) {
        throw new Error('Сервер не вернул комнату')
      }
      void navigate(
        `/calls/${room.id}${data.accessCode ? `#code=${encodeURIComponent(data.accessCode)}` : ''}`,
      )
    },
    [createRoom, navigate],
  )
  return (
    <CallsStyled>
      <nav>
        <Link to="/calls/devices">
          Проверка устройств и демонстрации экрана
        </Link>
        <Link to="/docs/video-calls">Как устроены звонки</Link>
      </nav>
      <h1 tabIndex={-1}>Видеозвонки</h1>
      <p>
        Создайте комнату и отправьте ссылку участникам. Общайтесь голосом,
        включайте камеры и делитесь экраном.
      </p>
      <p className="hint">
        P2P-звонки рассчитаны на небольшие группы. С ростом числа участников
        увеличивается нагрузка на сеть и устройства.
      </p>
      <div className="panel">
        <h2>Создать комнату</h2>
        {userLoading ? (
          <p>Загрузка…</p>
        ) : user ? (
          <CallRoomForm onSave={save} />
        ) : (
          <p>
            <Button variant="secondary" onClick={openAuth}>
              Войти в аккаунт
            </Button>
            , чтобы создать комнату. Для проверки устройств регистрация не
            нужна.
          </p>
        )}
      </div>
      {user?.sudo && <CallRoomList />}
      <AuthModal isOpen={authOpen} onClose={closeAuth} />
    </CallsStyled>
  )
}
