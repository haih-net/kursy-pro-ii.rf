import type * as React from 'react'
import { levels, type LevelId } from '../catalog'
import { LevelBandStyled } from './styles'
interface LevelBandProps extends React.PropsWithChildren {
  readonly showLabel?: boolean
  readonly level: LevelId
}
export const LevelBand: React.FC<LevelBandProps> = ({
  level,
  children,
  showLabel = false,
}) => (
  <LevelBandStyled
    data-level={level}
    role="group"
    aria-label={levels[level].title}
  >
    {showLabel && <span className="level-title">{levels[level].title}</span>}
    <div className="level-content">{children}</div>
  </LevelBandStyled>
)
