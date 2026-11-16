export interface CallMediaStatus {
  microphone: boolean
  camera: boolean
  screen: boolean
}
export interface CallSignal {
  description?: RTCSessionDescriptionInit
  candidate?: RTCIceCandidateInit
  media?: CallMediaStatus
  connectionId?: string
  reset?: boolean
}
export interface CallPeer {
  id: string
  name: string
  connected: boolean
  image?: string | null
}
export type CallServerMessage =
  | {
      type: 'welcome'
      id: string
      self?: CallPeer
      peers: CallPeer[]
      epoch: string
      sessionToken: string
      iceServers: RTCIceServer[]
    }
  | { type: 'joined'; peer: CallPeer }
  | { type: 'peer-status'; id: string; connected: boolean }
  | { type: 'left'; id: string }
  | { type: 'signal'; from: string; payload: CallSignal }
  | { type: 'settings' | 'closed' | 'pong' }
  | { type: 'error'; message: string }
export interface CallConnectionStatus {
  phase: 'connecting' | 'connected' | 'reconnecting' | 'denied'
  attempt: number
  nextAttemptAt: number | null
  message: string
}
