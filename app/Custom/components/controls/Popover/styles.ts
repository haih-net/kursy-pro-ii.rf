import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const UnderlayStyled = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${theme.zIndex.popover};
`
export const PopoverStyled = styled.div`
  z-index: ${theme.zIndex.popover};
  box-sizing: border-box;
  width: var(--control-popover-width);
  max-width: calc(100vw - 24px);
  max-height: min(460px, 65vh);
  overflow: auto;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;
  background: ${theme.colors.background};
  color: ${theme.colors.foreground};
  font: ${theme.fontSizes.md} ${theme.font};
  box-shadow: ${theme.shadows.md};
`
