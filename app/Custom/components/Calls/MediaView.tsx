import type * as React from 'react'
import { useEffect, useRef } from 'react'
export const MediaView: React.FC<{
  stream: MediaStream | null
  muted?: boolean
  label: string
  audio?: boolean
}> = ({ stream, muted = false, label, audio = false }) => {
  const ref = useRef<HTMLVideoElement & HTMLAudioElement>(null)
  useEffect(() => {
    const element = ref.current
    if (element) {
      element.srcObject = stream
    }
    return () => {
      if (element) {
        element.srcObject = null
      }
    }
  }, [stream])
  return audio ? (
    <audio ref={ref} autoPlay controls aria-label={label} />
  ) : (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      controls={!muted}
      aria-label={label}
    />
  )
}
