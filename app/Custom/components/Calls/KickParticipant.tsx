import type * as React from 'react'
import { useCallback, useState } from 'react'
import { useKickCallRoomParticipantMutation } from 'app/gql/generated'
import { useAppContext } from '../AppContext'
import { Button } from '../Button'

export const KickCallParticipant: React.FC<{
  roomId: string
  participantId: string
  name: string
}> = ({ roomId, participantId, name }) => {
  const { user } = useAppContext() ?? {}
  const [kick, { loading }] = useKickCallRoomParticipantMutation()
  const [error, setError] = useState('')
  const kickParticipant = useCallback(async (): Promise<void> => {
    if (!window.confirm(`Исключить участника «${name}» из звонка?`)) {
      return
    }
    setError('')
    try {
      await kick({ variables: { id: roomId, participantId } })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось исключить участника',
      )
    }
  }, [kick, roomId, participantId, name])
  if (!user?.sudo) {
    return null
  }
  return (
    <div>
      <Button variant="danger" disabled={loading} onClick={kickParticipant}>
        Исключить участника
      </Button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
