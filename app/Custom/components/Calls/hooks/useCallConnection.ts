import { useEffect, useRef, useState } from 'react'
import type { JoinCallRoomMutation } from 'app/gql/generated'
import type { CallMediaKind } from './useCallMedia'
import type {
  CallConnectionStatus,
  CallPeer,
  CallMediaStatus,
  CallSignal,
} from '../interfaces'
import {
  createCallSignaling,
  type CallSignaling,
} from '../helpers/createCallSignaling'

export type CallSession = NonNullable<JoinCallRoomMutation['joinCallRoom']>
export interface RemoteCallPeer {
  id: string
  name: string
  image: string | null
  streams: Record<CallMediaKind, MediaStream | null>
  media: CallMediaStatus
  signalingConnected: boolean
  state: RTCPeerConnectionState
}
interface PeerRuntime {
  pc: RTCPeerConnection
  makingOffer: boolean
  ignoreOffer: boolean
  settingAnswer: boolean
  candidates: RTCIceCandidateInit[]
  queue: Promise<void>
  connectionId: string
  needsRecovery: boolean
  signalingConnected: boolean
}
const kinds: CallMediaKind[] = ['microphone', 'camera', 'screen']
export function useCallConnection(
  session: CallSession,
  streams: Record<CallMediaKind, MediaStream | null>,
  onSettings: () => void,
  onDisconnect: () => void,
): {
  peers: RemoteCallPeer[]
  self: CallPeer | null
  status: CallConnectionStatus
  error: string
} {
  const [self, setSelf] = useState<CallPeer | null>(null)
  const [peers, setPeers] = useState<RemoteCallPeer[]>([])
  const [status, setStatus] = useState<CallConnectionStatus>({
    phase: 'connecting',
    attempt: 0,
    nextAttemptAt: null,
    message: 'Подключение…',
  })
  const transport = useRef<CallSignaling | null>(null)
  const [error, setError] = useState('')
  const streamsRef = useRef(streams)
  const callbacks = useRef({ onSettings, onDisconnect })
  const sync = useRef<(() => void) | null>(null)
  useEffect(() => {
    callbacks.current = { onSettings, onDisconnect }
  }, [onSettings, onDisconnect])
  useEffect(() => {
    streamsRef.current = streams
    sync.current?.()
  }, [streams])
  useEffect(() => {
    let disposed = false
    let localId = ''
    const runtimes: Map<string, PeerRuntime> = new Map()
    const names: Map<string, string> = new Map()
    const images: Map<string, string | null> = new Map()
    const retiredConnections: Map<string, Set<string>> = new Map()
    let epoch = ''
    let iceServers: RTCIceServer[] = session.iceServers.map((server) => ({
      urls: server.urls,
      username: server.username ?? undefined,
      credential: server.credential ?? undefined,
    }))
    const report = (err: unknown): void => {
      if (!disposed) {
        setError(err instanceof Error ? err.message : 'Ошибка соединения')
      }
    }
    const send = (target: string, payload: CallSignal): boolean => {
      const peer = runtimes.get(target)
      const sent =
        peer?.signalingConnected !== false &&
        (transport.current?.send({
          type: 'signal',
          target,
          payload: { ...payload, connectionId: peer?.connectionId },
        }) ??
          false)
      if (!sent && peer && (payload.description || payload.candidate)) {
        peer.needsRecovery = true
      }
      return sent
    }
    const update = (id: string, patch: Partial<RemoteCallPeer>): void => {
      if (!disposed) {
        setPeers((prev) =>
          prev.map((peer) => (peer.id === id ? { ...peer, ...patch } : peer)),
        )
      }
    }
    const mediaStatus = (): CallMediaStatus => ({
      microphone: Boolean(streamsRef.current.microphone),
      camera: Boolean(streamsRef.current.camera),
      screen: Boolean(streamsRef.current.screen),
    })
    const replaceTracks = async (
      id: string,
      peer: PeerRuntime,
    ): Promise<void> => {
      if (runtimes.get(id) !== peer || peer.pc.signalingState === 'closed') {
        return
      }
      const transceivers = peer.pc.getTransceivers()
      await Promise.all(
        kinds.map((kind, index) =>
          transceivers[index]?.sender.replaceTrack(
            streamsRef.current[kind]?.getTracks()[0] ?? null,
          ),
        ),
      )
      if (runtimes.get(id) === peer) {
        send(id, { media: mediaStatus() })
      }
    }
    sync.current = () => {
      for (const [id, peer] of runtimes) {
        void replaceTracks(id, peer).catch(report)
      }
    }
    const remove = (id: string): void => {
      const connectionId = runtimes.get(id)?.connectionId
      if (connectionId) {
        const retired = retiredConnections.get(id) ?? new Set<string>()
        retired.add(connectionId)
        retiredConnections.set(id, retired)
      }
      runtimes.get(id)?.pc.close()
      runtimes.delete(id)
      if (!disposed) {
        setPeers((prev) => prev.filter((p) => p.id !== id))
      }
    }
    const add = (
      id: string,
      name: string,
      connected = true,
      connectionId = '',
      image: string | null = null,
    ): PeerRuntime => {
      names.set(id, name)
      if (image !== null || !images.has(id)) {
        images.set(id, image)
      }
      const existing = runtimes.get(id)
      if (existing) {
        return existing
      }
      const pc = new RTCPeerConnection({ iceServers })
      const peer: PeerRuntime = {
        pc,
        makingOffer: false,
        ignoreOffer: false,
        settingAnswer: false,
        candidates: [],
        queue: Promise.resolve(),
        connectionId: localId < id ? crypto.randomUUID() : connectionId,
        needsRecovery: false,
        signalingConnected: connected,
      }
      runtimes.set(id, peer)
      setPeers((prev) => [
        ...prev,
        {
          id,
          name,
          image: images.get(id) ?? null,
          streams: { microphone: null, camera: null, screen: null },
          media: { microphone: false, camera: false, screen: false },
          state: 'new',
          signalingConnected: connected,
        },
      ])
      // Only the initial offerer creates slots. The answerer reuses the slots
      // from the offer, avoiding duplicate transceivers during initial glare.
      if (localId < id) {
        for (const kind of kinds) {
          const stream = streamsRef.current[kind]
          pc.addTransceiver(
            stream?.getTracks()[0] ??
              (kind === 'microphone' ? 'audio' : 'video'),
            { direction: 'sendrecv' },
          )
        }
      }
      pc.ontrack = (event) => {
        if (runtimes.get(id) !== peer || disposed) {
          return
        }
        const index = pc.getTransceivers().indexOf(event.transceiver)
        const kind = kinds[index]
        if (!kind) {
          return
        }
        const stream = new MediaStream([event.track])
        setPeers((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, streams: { ...p.streams, [kind]: stream } }
              : p,
          ),
        )
      }
      pc.onicecandidate = ({ candidate }) => {
        if (candidate && runtimes.get(id) === peer) {
          send(id, { candidate: candidate.toJSON() })
        }
      }
      pc.onconnectionstatechange = () => {
        if (runtimes.get(id) !== peer || disposed) {
          return
        }
        update(id, { state: pc.connectionState })
        if (pc.connectionState === 'failed') {
          pc.restartIce()
        }
      }
      pc.onnegotiationneeded = async () => {
        if (runtimes.get(id) !== peer || disposed) {
          return
        }
        try {
          peer.makingOffer = true
          await pc.setLocalDescription()
          if (pc.localDescription && runtimes.get(id) === peer) {
            send(id, { description: pc.localDescription.toJSON() })
          }
        } catch (err) {
          if (pc.signalingState !== 'closed') {
            report(err)
          }
        } finally {
          peer.makingOffer = false
        }
      }
      send(id, { media: mediaStatus() })
      return peer
    }
    const handleSignal = async (
      from: string,
      signal: CallSignal,
    ): Promise<void> => {
      let peer = runtimes.get(from)
      if (!peer) {
        return
      }
      if (
        signal.connectionId &&
        retiredConnections.get(from)?.has(signal.connectionId)
      ) {
        return
      }
      if (signal.reset) {
        if (localId < from) {
          const name = names.get(from) ?? ''
          remove(from)
          add(from, name)
        }
        return
      }
      if (!peer.connectionId && localId > from && signal.connectionId) {
        peer.connectionId = signal.connectionId
      }
      if (signal.connectionId !== peer.connectionId) {
        if (
          signal.description?.type !== 'offer' ||
          localId < from ||
          !signal.connectionId
        ) {
          return
        }
        const name = names.get(from) ?? ''
        remove(from)
        peer = add(from, name, true, signal.connectionId)
      }
      const { pc } = peer
      if (pc.signalingState === 'closed') {
        return
      }
      if (signal.media) {
        update(from, { media: signal.media })
      }
      if (signal.description) {
        const ready =
          !peer.makingOffer &&
          (pc.signalingState === 'stable' || peer.settingAnswer)
        const collision = signal.description.type === 'offer' && !ready
        peer.ignoreOffer = localId < from && collision
        if (peer.ignoreOffer) {
          peer.candidates = []
          return
        }
        peer.settingAnswer = signal.description.type === 'answer'
        try {
          await pc.setRemoteDescription(signal.description)
        } finally {
          peer.settingAnswer = false
        }
        for (const candidate of peer.candidates.splice(0)) {
          await pc.addIceCandidate(candidate)
        }
        if (signal.description.type === 'offer') {
          for (const transceiver of pc.getTransceivers()) {
            transceiver.direction = 'sendrecv'
          }
          await replaceTracks(from, peer)
          await pc.setLocalDescription()
          if (pc.localDescription && runtimes.get(from) === peer) {
            send(from, { description: pc.localDescription.toJSON() })
          }
        }
      } else if (signal.candidate && !peer.ignoreOffer) {
        if (pc.remoteDescription) {
          await pc.addIceCandidate(signal.candidate)
        } else {
          peer.candidates.push(signal.candidate)
        }
      }
    }
    const recover = (id: string): void => {
      const peer = runtimes.get(id)
      if (!peer || !peer.signalingConnected) {
        return
      }
      if (
        peer.needsRecovery ||
        peer.pc.signalingState !== 'stable' ||
        ['new', 'failed', 'disconnected', 'closed'].includes(
          peer.pc.connectionState,
        )
      ) {
        if (localId < id) {
          remove(id)
          add(id, names.get(id) ?? '')
        } else {
          send(id, { reset: true })
        }
      } else {
        void replaceTracks(id, peer).catch(report)
      }
    }
    const signaling = createCallSignaling({
      url: `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/api/calls/socket`,
      sessionToken: session.sessionToken ?? '',
      onStatus: (value) => {
        if (!disposed) {
          setStatus(value)
          if (value.phase === 'connected') {
            setError('')
          }
        }
      },
      onStopped: () => {
        for (const id of runtimes.keys()) {
          remove(id)
        }
        callbacks.current.onDisconnect()
      },
      onMessage: (msg) => {
        if (disposed) {
          return
        }
        switch (msg.type) {
          case 'welcome': {
            setSelf(msg.self ?? null)
            const returning = Boolean(localId)
            // A server restart loses presence, but the signed session keeps our identity.
            if (
              (epoch && epoch !== msg.epoch) ||
              (localId && localId !== msg.id)
            ) {
              for (const id of runtimes.keys()) {
                remove(id)
              }
            }
            epoch = msg.epoch
            localId = msg.id
            iceServers = msg.iceServers
            const present = new Set(msg.peers.map((peer) => peer.id))
            for (const id of runtimes.keys()) {
              if (!present.has(id)) {
                remove(id)
              }
            }
            for (const p of msg.peers) {
              const existing = runtimes.has(p.id)
              const peer = add(p.id, p.name, p.connected, '', p.image ?? null)
              peer.signalingConnected = p.connected
              update(p.id, { signalingConnected: p.connected })
              if (existing) {
                recover(p.id)
              }
            }
            if (returning) {
              callbacks.current.onSettings()
            }
            break
          }
          case 'joined':
            add(
              msg.peer.id,
              msg.peer.name,
              msg.peer.connected,
              '',
              msg.peer.image ?? null,
            )
            break
          case 'peer-status': {
            const peer = runtimes.get(msg.id)
            if (peer) {
              peer.signalingConnected = msg.connected
              update(msg.id, { signalingConnected: msg.connected })
              if (msg.connected) {
                recover(msg.id)
              }
            }
            break
          }
          case 'left':
            remove(msg.id)
            names.delete(msg.id)
            images.delete(msg.id)
            retiredConnections.delete(msg.id)
            break
          case 'settings':
            callbacks.current.onSettings()
            break
          case 'signal': {
            const peer = runtimes.get(msg.from)
            if (peer) {
              peer.queue = peer.queue
                .then(() => {
                  if (runtimes.get(msg.from) === peer) {
                    return handleSignal(msg.from, msg.payload)
                  }
                })
                .catch((err: unknown) => {
                  if (runtimes.get(msg.from) === peer) {
                    report(err)
                  }
                })
            }
            break
          }
        }
      },
    })
    transport.current = signaling
    return () => {
      disposed = true
      sync.current = null
      signaling.close()
      if (transport.current === signaling) {
        transport.current = null
      }
      for (const peer of runtimes.values()) {
        peer.pc.close()
      }
      runtimes.clear()
    }
  }, [session])
  return { peers, self, status, error }
}
