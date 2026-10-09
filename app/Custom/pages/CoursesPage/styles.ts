import { styled } from '@linaria/react'
export const CoursesStyled = styled.section`
  & .catalog-hero {
    min-height: calc(100svh - 145px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 35px;
  }
  & h1 {
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    line-height: 1.15;
    letter-spacing: -0.035em;
    font-weight: 650;
    margin: 0 0 25px;
  }
  & .intro {
    max-width: 65ch;
    font-size: 1.12rem;
  }
  & article {
    border-top: 1px solid #bbb;
    padding: 30px 0 0;
    margin-top: 25px;
  }
  & article h2 {
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.025em;
    max-width: 32ch;
    margin: 10px 0 22px;
  }
  & article h2 a {
    text-decoration: none;
  }
  & article p {
    max-width: 78ch;
  }
  & article ul {
    padding-left: 20px;
    max-width: 75ch;
  }
  & article li {
    margin: 8px 0;
  }
  & .label {
    color: #666;
    font-size: 0.85rem;
  }
  & .course-link {
    display: inline-block;
    margin-top: 15px;
    padding: 13px 22px;
    color: #fff;
    background: #ad3b20;
    border-radius: 3px;
    text-decoration: none;
    font-weight: 600;
  }
  & .course-link:hover {
    background: #8d2c18;
  }
  & > h2 {
    border-top: 1px solid #252525;
    padding-top: 35px;
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  & > p {
    max-width: 75ch;
  }
`
