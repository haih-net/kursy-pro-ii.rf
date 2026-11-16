import { useCallback, useEffect, useRef, useState } from 'react'
export type CallMediaKind = 'microphone' | 'camera' | 'screen'
export interface CallMedia {
  streams: Record<CallMediaKind, MediaStream | null>
  busy: Record<CallMediaKind, boolean>
  devices: MediaDeviceInfo[]
  error: string
  start: (kind: CallMediaKind, deviceId?: string) => Promise<void>
  stop: (kind: CallMediaKind) => void
  stopAll: () => void
}
function captureError(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return 'Доступ не разрешён или выбор отменён. Проверьте разрешения браузера.'
    }
    if (error.name === 'NotFoundError') {
      return 'Устройство не найдено. Подключите камеру или микрофон.'
    }
    if (error.name === 'NotReadableError') {
      return 'Устройство занято или недоступно. Проверьте другие приложения.'
    }
    if (error.name === 'OverconstrainedError') {
      return 'Выбранное устройство недоступно. Выберите другое.'
    }
  }
  return error instanceof Error
    ? error.message
    : 'Не удалось включить устройство'
}
export function useCallMedia(): CallMedia {
  const tracks = useRef<Record<CallMediaKind, MediaStream | null>>({
    microphone: null,
    camera: null,
    screen: null,
  })
  const revisions = useRef<Record<CallMediaKind, number>>({
    microphone: 0,
    camera: 0,
    screen: 0,
  })
  const mounted = useRef(true)
  const [streams, setStreams] = useState(tracks.current)
  const [busy, setBusy] = useState<Record<CallMediaKind, boolean>>({
    microphone: false,
    camera: false,
    screen: false,
  })
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [error, setError] = useState('')
  const refresh = useCallback(async (): Promise<void> => {
    try {
      const available = await navigator.mediaDevices?.enumerateDevices()
      if (mounted.current) {
        setDevices(available ?? [])
      }
    } catch (err) {
      if (mounted.current) {
        setError(captureError(err))
      }
    }
  }, [])
  const stop = useCallback((kind: CallMediaKind): void => {
    revisions.current[kind]++
    tracks.current[kind]?.getTracks().forEach((track) => track.stop())
    tracks.current = { ...tracks.current, [kind]: null }
    if (mounted.current) {
      setStreams(tracks.current)
      setBusy((prev) => ({ ...prev, [kind]: false }))
    }
  }, [])
  const stopAll = useCallback((): void => {
    stop('microphone')
    stop('camera')
    stop('screen')
  }, [stop])
  const start = useCallback(
    async (kind: CallMediaKind, deviceId?: string): Promise<void> => {
      const revision = ++revisions.current[kind]
      setBusy((prev) => ({ ...prev, [kind]: true }))
      setError('')
      try {
        if (!navigator.mediaDevices) {
          throw new Error(
            'Для доступа к устройствам откройте сайт по HTTPS или через localhost.',
          )
        }
        if (kind === 'screen' && !navigator.mediaDevices.getDisplayMedia) {
          throw new Error('Этот браузер не поддерживает демонстрацию экрана.')
        }
        const device = deviceId ? { deviceId: { exact: deviceId } } : {}
        const stream =
          kind === 'screen'
            ? await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false,
              })
            : await navigator.mediaDevices.getUserMedia(
                kind === 'microphone'
                  ? {
                      audio: {
                        ...device,
                        echoCancellation: true,
                        noiseSuppression: true,
                      },
                      video: false,
                    }
                  : {
                      video: {
                        ...device,
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                      },
                      audio: false,
                    },
              )
        if (!mounted.current || revision !== revisions.current[kind]) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        tracks.current[kind]?.getTracks().forEach((track) => track.stop())
        tracks.current = { ...tracks.current, [kind]: stream }
        stream.getTracks().forEach((track) => {
          track.onended = () => {
            if (tracks.current[kind] === stream) {
              stop(kind)
            }
          }
        })
        setStreams(tracks.current)
        await refresh()
      } catch (err) {
        if (mounted.current && revision === revisions.current[kind]) {
          setError(captureError(err))
        }
      } finally {
        if (mounted.current && revision === revisions.current[kind]) {
          setBusy((prev) => ({ ...prev, [kind]: false }))
        }
      }
    },
    [refresh, stop],
  )
  useEffect(() => {
    mounted.current = true
    void refresh()
    navigator.mediaDevices?.addEventListener('devicechange', refresh)
    return () => {
      mounted.current = false
      stopAll()
      navigator.mediaDevices?.removeEventListener('devicechange', refresh)
    }
  }, [refresh, stopAll])
  return { streams, busy, devices, error, start, stop, stopAll }
}
