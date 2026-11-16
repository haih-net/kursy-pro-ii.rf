import { styled } from '@linaria/react'

export const FooterStyled = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px 28px;
  border-top: 1px solid #252525;
  padding: 28px 0;
  color: #555;
  font-size: 0.85rem;
  > span {
    margin-right: auto;
  }
  a {
    color: inherit;
  }
`
