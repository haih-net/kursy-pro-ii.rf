import type * as React from 'react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import {
  type CallRoomNoNestingFragment,
  useCloseCallRoomMutation,
  useDeleteCallRoomMutation,
  useUpdateCallRoomMutation,
} from 'app/gql/generated'
import { Button } from '../Button'
import { CallRoomForm } from './RoomForm'
import type { CallRoomFormData } from './RoomForm/schema'

type RoomAction = 'settings' | 'close' | 'delete' | null

export const CallRoomListItem: React.FC<{
  room: CallRoomNoNestingFragment
  onRefresh: () => Promise<unknown>
}> = ({ room, onRefresh }) => {
  const [action, setAction] = useState<RoomAction>(null)
  const [notice, setNotice] = useState('')
  const [update] = useUpdateCallRoomMutation()
  const [close, closing] = useCloseCallRoomMutation()
  const [remove, removing] = useDeleteCallRoomMutation()
  const busy = closing.loading || removing.loading
  const cancel = useCallback((): void => setAction(null), [])
  const select = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const value = event.currentTarget.dataset.action
      if (value === 'settings' || value === 'close' || value === 'delete') {
        setNotice('')
        setAction(value)
      }
    },
    [],
  )
  const save = useCallback(
    async (data: CallRoomFormData): Promise<void> => {
      await update({ variables: { id: room.id, data } })
      await onRefresh()
      setAction(null)
      setNotice('Настройки сохранены')
    },
    [update, room.id, onRefresh],
  )
  const confirm = useCallback(async (): Promise<void> => {
    setNotice('')
    try {
      if (action === 'delete') {
        await remove({ variables: { id: room.id } })
      } else if (action === 'close') {
        await close({ variables: { id: room.id } })
      } else {
        return
      }
      setAction(null)
      await onRefresh()
    } catch (err) {
      setNotice(
        err instanceof Error ? err.message : 'Не удалось выполнить действие',
      )
    }
  }, [action, remove, close, room.id, onRefresh])
  return (
    <li>
      <div className="room-row">
        <div className="room-info">
          <Link className="room-title" to={`/calls/${room.id}`}>
            {room.title}
          </Link>
          <div className="room-details">
            <span>{room.closed ? 'Комната закрыта' : 'Комната открыта'}</span>
            <span>
              {room.authenticatedOnly
                ? 'Только авторизованным'
                : 'Всем по ссылке'}
            </span>
            <span>
              {room.hasAccessCode ? 'Защищено кодом' : 'Без кода доступа'}
            </span>
          </div>
        </div>
        {!action && (
          <div className="room-actions">
            {!room.closed && (
              <>
                <Button
                  size="small"
                  variant="secondary"
                  data-action="settings"
                  onClick={select}
                >
                  Настройки
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  data-action="close"
                  onClick={select}
                >
                  Завершить звонок
                </Button>
              </>
            )}
            <Button
              size="small"
              variant="danger"
              data-action="delete"
              onClick={select}
            >
              Удалить
            </Button>
          </div>
        )}
      </div>
      {action === 'settings' && !room.closed && (
        <div className="room-settings">
          <CallRoomForm
            editing
            initial={{
              title: room.title,
              authenticatedOnly: room.authenticatedOnly,
            }}
            onSave={save}
          />
          <Button size="small" variant="secondary" onClick={cancel}>
            Отмена
          </Button>
        </div>
      )}
      {(action === 'close' || action === 'delete') && (
        <div className="room-confirmation">
          <p>
            {action === 'delete'
              ? 'Удалить комнату и отключить всех участников? Отменить удаление нельзя.'
              : 'Завершить звонок для всех и закрыть комнату? Повторное открытие недоступно.'}
          </p>
          <Button
            size="small"
            variant="danger"
            disabled={busy}
            onClick={confirm}
          >
            {action === 'delete' ? 'Да, удалить' : 'Да, завершить для всех'}
          </Button>
          <Button
            size="small"
            variant="secondary"
            disabled={busy}
            onClick={cancel}
          >
            Отмена
          </Button>
        </div>
      )}
      {notice && <p role="status">{notice}</p>}
    </li>
  )
}
