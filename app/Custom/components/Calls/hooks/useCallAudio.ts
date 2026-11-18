import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCallsContext } from './useCallsContext'
import { useCallNotifications } from './useCallNotifications'

interface AudioGraph {
  context: AudioContext
  output: GainNode
}
interface AudioSource {
  stream: MediaStream
  node: MediaStreamAudioSourceNode
}

export function useCallAudioActions() {
  const { state, dispatch } = useCallsContext()
  const setVolume = useCallback(
    (volume: number): void => {
      if (Number.isFinite(volume)) {
        dispatch({
          type: 'audioChanged',
          audio: {
            volume: Math.max(0, Math.min(1, volume)),
            muted: false,
          },
        })
      }
    },
    [dispatch],
  )

  const toggleMuted = useCallback((): void => {
    const audio = state.audio
    dispatch({ type: 'audioChanged', audio: { muted: !audio.muted } })
  }, [state.audio, dispatch])

  const resume = useCallback((): void => {
    const audio = state.audio
    dispatch({
      type: 'audioChanged',
      audio: { resumeRequest: audio.resumeRequest + 1 },
    })
  }, [state.audio, dispatch])

  return { setVolume, toggleMuted, resume }
}

export function useCallAudio(): void {
  const { state, dispatch } = useCallsContext()
  const { reportError } = useCallNotifications()
  const graph = useRef<AudioGraph | null>(null)
  const sources = useRef(new Map<string, AudioSource>())
  const active = Object.values(state.rooms).some(
    (room) =>
      room.session &&
      !room.room?.closed &&
      room.connection.status.phase !== 'denied',
  )

  const incoming = useMemo(() => {
    const streams = new Map<string, MediaStream>()
    for (const [id, room] of Object.entries(state.rooms)) {
      if (
        !room.session ||
        room.room?.closed ||
        room.connection.status.phase === 'denied'
      ) {
        continue
      }
      for (const peer of room.connection.peers) {
        if (peer.media.microphone && peer.streams.microphone) {
          streams.set(`${id}:${peer.id}`, peer.streams.microphone)
        }
      }
    }
    return streams
  }, [state.rooms])

  const publishBlocked = useCallback(
    (blocked: boolean): void => {
      dispatch({ type: 'audioChanged', audio: { blocked } })
    },
    [dispatch],
  )

  const release = useCallback((): void => {
    for (const source of sources.current.values()) {
      source.node.disconnect()
    }
    sources.current.clear()
    const current = graph.current
    graph.current = null
    if (current) {
      current.context.onstatechange = null
      current.output.disconnect()
      void current.context.close().catch(reportError)
    }
  }, [reportError])

  useEffect(() => release, [release])
  useEffect(() => {
    if (!active) {
      release()
      publishBlocked(false)
      return
    }
    try {
      if (!graph.current) {
        const context = new AudioContext()
        const output = context.createGain()
        output.gain.value = 1
        output.connect(context.destination)
        graph.current = { context, output }
        context.onstatechange = () => {
          if (graph.current?.context === context) {
            publishBlocked(context.state !== 'running')
          }
        }
        publishBlocked(context.state !== 'running')
      }
      for (const [key, source] of sources.current) {
        if (incoming.get(key) !== source.stream) {
          source.node.disconnect()
          sources.current.delete(key)
        }
      }
      for (const [key, stream] of incoming) {
        if (!sources.current.has(key)) {
          const node = graph.current.context.createMediaStreamSource(stream)
          node.connect(graph.current.output)
          sources.current.set(key, { stream, node })
        }
      }
    } catch (error) {
      reportError(error)
    }
  }, [incoming, active, publishBlocked, release, reportError])
  useEffect(() => {
    if (graph.current) {
      graph.current.output.gain.value = state.audio.muted
        ? 0
        : state.audio.volume
    }
  }, [state.audio.muted, state.audio.volume])
  useEffect(() => {
    const context = graph.current?.context
    if (state.audio.resumeRequest && context) {
      void context
        .resume()
        .then(() => {
          if (graph.current?.context === context) {
            publishBlocked(context.state !== 'running')
          }
        })
        .catch(reportError)
    }
  }, [state.audio.resumeRequest, publishBlocked, reportError])
}
