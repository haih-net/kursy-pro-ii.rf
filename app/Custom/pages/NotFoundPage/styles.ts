import { styled } from '@linaria/react'
export const NotFoundStyled = styled.section`
  padding: 50px 24px;
  text-align: center;
  border-radius: 18px;
  background: #f5f5f5;
  & .code {
    font-family: Georgia, serif;
    font-size: 6rem;
    line-height: 1;
    color: #666666;
    margin: 0 0 30px;
  }
  & h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 550;
    letter-spacing: -0.04em;
  }
  & p {
    color: #555555;
  }
  & .button-primary {
    margin-top: 20px;
  }
`
