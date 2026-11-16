import { styled } from '@linaria/react'

export const DocumentationStyled = styled.article`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 16px 64px;
  min-width: 0;
  overflow-wrap: anywhere;

  nav {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .status {
    color: #475569;
    font-size: 0.9rem;
  }
  @media (min-width: 768px) {
    padding: 40px 32px 80px;
  }
`
