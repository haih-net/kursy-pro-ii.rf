import type { ControllerRenderProps } from 'react-hook-form'
import type { CallRoomFormData } from '../schema'

export interface AccessSelectProps {
  field: ControllerRenderProps<CallRoomFormData, 'authenticatedOnly'>
  id: string
}
