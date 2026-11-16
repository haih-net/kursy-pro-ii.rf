import type * as React from 'react'
import { Link } from 'react-router'
import { CallsStyled } from 'app/Custom/components/Calls/styles'
import { useCallMedia } from 'app/Custom/components/Calls/hooks/useCallMedia'
import { DeviceControls } from 'app/Custom/components/Calls/DeviceControls'
import { CameraEffects } from './CameraEffects'
import { ScreenShare } from './ScreenShare'
export const CallDevicesPage: React.FC = () => {
  const media = useCallMedia()
  return (
    <CallsStyled>
      <nav>
        <Link to="/calls">Видеозвонки</Link>
        <Link to="/docs/video-calls">Документация</Link>
      </nav>
      <h1 tabIndex={-1}>Проверка камеры, микрофона и демонстрации экрана</h1>
      <p>
        Проверьте камеру, уровень микрофона, звук и демонстрацию экрана до
        созвона. Комната и регистрация не нужны. Проверка выполняется в
        браузере: звук и видео никуда не отправляются.
      </p>
      <DeviceControls
        media={media}
        cameraPreview={<CameraEffects stream={media.streams.camera} />}
      />
      <ScreenShare media={media} />
    </CallsStyled>
  )
}
