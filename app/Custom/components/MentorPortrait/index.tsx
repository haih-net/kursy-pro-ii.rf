import type * as React from 'react'
import portrait from './assets/nikolai-lanets.webp'
import smallPortrait from './assets/nikolai-lanets-small.webp'
interface MentorPortraitProps {
  readonly className?: string
  readonly compact?: boolean
}
export const MentorPortrait: React.FC<MentorPortraitProps> = ({
  className,
  compact = false,
}) => (
  <img
    className={className}
    src={portrait}
    srcSet={`${smallPortrait} 400w, ${portrait} 800w`}
    sizes={compact ? '88px' : '(min-width: 640px) 300px, 220px'}
    width={800}
    height={930}
    alt="Николай Ланец — автор и ведущий курса"
  />
)
