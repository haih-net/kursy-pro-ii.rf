import { useCallback } from 'react'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
export const CallInvitation: React.FC<{
  roomId: string
  code: string
  hasCode: boolean
}> = ({ roomId, code, hasCode }) => {
  const [origin, setOrigin] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    setOrigin(location.origin)
  }, [])
  const url = `${origin}/calls/${roomId}${hasCode && code ? `#code=${encodeURIComponent(code)}` : ''}`
  const selectLink: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => event.target.select(),
    [],
  )
  const copy = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url)
      setMessage('Ссылка скопирована')
    } catch {
      setMessage(
        'Не удалось скопировать автоматически. Выделите ссылку и скопируйте вручную.',
      )
    }
  }, [url])
  return (
    <div className="panel">
      <h2>Пригласить участников</h2>
      <input
        className="invitation"
        aria-label="Ссылка приглашения"
        value={url}
        readOnly
        onFocus={selectLink}
      />
      <div className="actions">
        <Button variant="secondary" onClick={copy}>
          Скопировать приглашение
        </Button>
      </div>
      {hasCode && !code && (
        <p className="hint">
          Код не хранится в открытом виде. Эта ссылка потребует ручного ввода
          кода. Для ссылки с кодом войдите с ним или задайте новый код в
          настройках.
        </p>
      )}
      {hasCode && code && (
        <p className="hint">
          Ссылка содержит код доступа. Передавайте её только тем, кого хотите
          пригласить.
        </p>
      )}
      <p role="status">{message}</p>
    </div>
  )
}
