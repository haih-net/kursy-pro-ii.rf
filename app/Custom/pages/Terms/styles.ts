import { styled } from '@linaria/react'

export const TermsPageStyled = styled.section`
  max-width: 78ch;
  padding: 35px 0;
  & h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.15;
  }
  & section {
    margin: 30px 0;
  }
  & dt {
    font-size: 1.35rem;
    font-weight: 600;
    margin-top: 25px;
  }
  & dd {
    margin: 12px 0 25px;
  }
`
