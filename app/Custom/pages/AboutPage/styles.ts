import { styled } from '@linaria/react'
export const AboutStyled = styled.article`
  & {
    overflow-wrap: anywhere;
  }
  & > nav {
    font-size: 0.8rem;
    color: #666;
  }
  & h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.12;
    margin: 12px 0 25px;
    letter-spacing: -0.035em;
    font-weight: 650;
  }
  & h2 {
    font-size: clamp(1.8rem, 3.3vw, 2.8rem);
    line-height: 1.25;
    margin: 0 0 24px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  & p {
    max-width: 65ch;
  }
  & a {
    text-underline-offset: 4px;
  }
  & .eyebrow {
    color: #666;
    font-size: 0.85rem;
  }
  & .hero {
    display: grid;
    gap: 28px;
    align-content: center;
    min-height: calc(100svh - 170px);
    padding: 30px 0;
  }
  & .portrait {
    width: 180px;
    height: auto;
  }
  & .intro {
    font-size: 1.2rem;
  }
  & .google-check {
    border-top: 1px solid #252525;
    padding: 40px 0;
    margin-top: 30px;
  }
  & .google-check h2 {
    max-width: 20ch;
  }
  & .google-questions {
    display: grid;
    margin-top: 30px;
    border-top: 1px solid #bbb;
  }
  & .google-questions a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 0;
    border-bottom: 1px solid #bbb;
    text-decoration: none;
    font-weight: 600;
  }
  & .google-questions a:hover {
    background: #f5f5f5;
  }
  & .google-questions a > span:last-child {
    color: #ad3b20;
    font-size: 1.3rem;
  }
  & .link-note {
    color: #666;
    font-size: 0.8rem;
  }
  & .closing {
    padding: 40px 0 10px;
    border-top: 1px solid #252525;
  }
  & .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 25px;
    margin-top: 25px;
  }
  & .primary {
    display: inline-block;
    padding: 13px 22px;
    background: #ad3b20;
    color: #fff;
    border-radius: 3px;
    text-decoration: none;
    font-weight: 600;
  }
  & .primary:hover {
    background: #8d2c18;
  }
  @media (min-width: 760px) {
    & .hero {
      grid-template-columns: minmax(0, 1fr) 290px;
      gap: 60px;
      align-items: center;
    }
    & .portrait {
      width: 290px;
    }
  }
`
