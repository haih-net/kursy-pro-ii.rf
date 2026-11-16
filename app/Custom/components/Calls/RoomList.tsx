import type * as React from 'react'
import { useCallback } from 'react'
import { useCallRoomsQuery } from 'app/gql/generated'
import { CallRoomListItem } from './RoomListItem'
import { CallRoomListStyled } from './styles'

export const CallRoomList: React.FC = () => {
  const { data, loading, error, refetch } = useCallRoomsQuery({
    fetchPolicy: 'network-only',
  })
  const refresh = useCallback(() => refetch(), [refetch])
  return (
    <CallRoomListStyled className="panel">
      <h2>Существующие звонки</h2>
      {loading && <p>Загрузка…</p>}
      {error && <p role="alert">{error.message}</p>}
      {data?.callRooms.length === 0 && <p>Звонков пока нет.</p>}
      <ul>
        {data?.callRooms.map((room) => (
          <CallRoomListItem key={room.id} room={room} onRefresh={refresh} />
        ))}
      </ul>
    </CallRoomListStyled>
  )
}
