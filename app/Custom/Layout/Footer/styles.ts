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
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    width: 100%;
  }
  > span {
    margin-right: auto;
  }
  a {
    color: inherit;
  }
`
