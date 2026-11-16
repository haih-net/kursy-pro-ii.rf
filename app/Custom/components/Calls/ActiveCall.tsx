import { useCallback } from 'react'
import type * as React from 'react'
import { Button } from '../Button'
import type { CallMedia } from './hooks/useCallMedia'
import { useCallConnection, type CallSession } from './hooks/useCallConnection'
import { MediaView } from './MediaView'
import { useAppContext } from '../AppContext'
import { UserAvatar } from '../UserAvatar'
import { KickCallParticipant } from './KickParticipant'
import { ConnectionStatus } from './ConnectionStatus'
const states: Record<RTCPeerConnectionState, string> = {
  new: 'Подключение',
  connecting: 'Подключение',
  connected: 'На связи',
  disconnected: 'Связь прервана',
  failed: 'Не удалось установить связь',
  closed: 'Соединение закрыто',
}
export const ActiveCall: React.FC<{
  session: CallSession
  media: CallMedia
  onLeave: () => void
  onSettings: () => void
}> = ({ session, media, onLeave, onSettings }) => {
  const { user } = useAppContext() ?? {}
  const { peers, self, status, error } = useCallConnection(
    session,
    media.streams,
    onSettings,
    media.stopAll,
  )
  const toggleScreen = useCallback((): void => {
    if (media.streams.screen) {
      media.stop('screen')
    } else {
      void media.start('screen')
    }
  }, [media])
  return (
    <div className="panel">
      <h2>Участники: {peers.length + 1}</h2>
      <p>
        <UserAvatar
          user={
            user ?? {
              fullname: self?.name || 'Гость',
              username: null,
              image: self?.image ?? null,
            }
          }
          size={48}
        />{' '}
        Вы
      </p>
      <ConnectionStatus status={status} onRejoin={onLeave} />
      {!session.iceServers.some((server) =>
        server.urls.some((url) => url.startsWith('turn')),
      ) && (
        <p className="hint">
          TURN не настроен: некоторые сети могут не соединиться напрямую.
        </p>
      )}
      <div className="actions">
        <Button
          disabled={media.busy.screen || status.phase === 'denied'}
          onClick={toggleScreen}
        >
          {media.streams.screen
            ? 'Остановить демонстрацию'
            : 'Поделиться экраном'}
        </Button>
        <Button variant="danger" onClick={onLeave}>
          Выйти из звонка
        </Button>
      </div>
      {error && <p role="alert">{error}</p>}
      {media.streams.screen && (
        <div>
          <h3>Ваш экран</h3>
          <MediaView stream={media.streams.screen} muted label="Ваш экран" />
        </div>
      )}
      {!peers.length && (
        <p>Здесь появятся участники, когда откроют приглашение и войдут.</p>
      )}
      <div className="grid">
        {peers.map((peer) => (
          <article key={peer.id} className="panel">
            <h3>
              <UserAvatar
                user={{
                  fullname: peer.name,
                  username: null,
                  image: peer.image,
                }}
                size={48}
              />{' '}
              {peer.name}
            </h3>
            <KickCallParticipant
              roomId={session.id}
              participantId={peer.id}
              name={peer.name}
            />
            <p>{states[peer.state]}</p>
            {!peer.signalingConnected && (
              <p className="hint">Участник восстанавливает связь с сервером.</p>
            )}
            {peer.media.camera ? (
              <MediaView
                stream={peer.streams.camera}
                muted
                label={`Камера: ${peer.name}`}
              />
            ) : (
              <p>Камера выключена</p>
            )}
            {peer.media.microphone ? (
              <MediaView
                stream={peer.streams.microphone}
                audio
                label={`Звук: ${peer.name}`}
              />
            ) : (
              <p>Микрофон выключен</p>
            )}
            {peer.media.screen && (
              <>
                <h4>Демонстрация экрана</h4>
                <MediaView
                  stream={peer.streams.screen}
                  muted
                  label={`Экран: ${peer.name}`}
                />
              </>
            )}
          </article>
        ))}
      </div>
      <p className="hint">
        Если браузер заблокировал звук, нажмите воспроизведение в аудиоплеере
        участника.
      </p>
    </div>
  )
}
