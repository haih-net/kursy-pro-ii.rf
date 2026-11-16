import type * as React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import type { CallConnectionStatus } from './interfaces'

export const ConnectionStatus: React.FC<{
  status: CallConnectionStatus
  onRejoin: () => void
}> = ({ status, onRejoin }) => {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (!status.nextAttemptAt) {
      return
    }
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [status.nextAttemptAt])
  return (
    <div>
      <p role="status">
        {status.message}
        {status.phase === 'reconnecting' && (
          <>
            {' '}
            {status.nextAttemptAt
              ? `Попытка №${status.attempt + 1} через ${Math.max(0, Math.ceil((status.nextAttemptAt - now) / 1000))} с.`
              : `Попытка №${status.attempt}.`}
          </>
        )}
      </p>
      {status.phase === 'reconnecting' && (
        <p className="hint">
          Включённые камера, микрофон и демонстрация продолжают работать. Если
          связь с участниками сохранилась, вы можете продолжать разговор.
        </p>
      )}
      {status.phase === 'denied' && (
        <Button onClick={onRejoin}>Вернуться ко входу</Button>
      )}
    </div>
  )
}
