import { styled } from '@linaria/react'

export const CourseStyled = styled.article`
  & {
    overflow-wrap: anywhere;
  }
  & .mentor-intro {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 0;
  }
  & .mentor-intro img {
    width: 88px;
    height: 102px;
    object-fit: cover;
    border-radius: 10px;
  }
  & .mentor-intro p {
    flex: 1;
    min-width: 190px;
    margin: 0;
  }
  & .difficulty-hero {
    background: #f5f5f5;
    border: 1px solid #cccccc;
    border-radius: 16px;
    padding: 24px;
    margin: 28px 0;
  }
  & .difficulty-hero h2 {
    margin: 12px 0 20px;
  }
  & .difficulty-legend {
    display: grid;
    gap: 0 24px;
    margin: 20px 0;
  }
  & .difficulty-price {
    border-top: 1px solid #cccccc;
    padding-top: 20px;
  }
  @media (min-width: 800px) {
    & .difficulty-hero {
      padding: 32px;
    }
    & .difficulty-legend {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  & h1 {
    font-size: clamp(2.25rem, 7vw, 3.75rem);
    line-height: 1.15;
    margin: 16px 0 12px;
  }
  & h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    line-height: 1.3;
    margin: 48px 0 16px;
    scroll-margin-top: 24px;
  }
  & h3 {
    line-height: 1.4;
  }
  & .eyebrow {
    color: #626262;
    font-size: 0.85rem;
  }
  & .subtitle {
    font-size: clamp(1.25rem, 4vw, 1.65rem);
    line-height: 1.4;
  }
  & .lead {
    font-size: 1.1rem;
    max-width: 65ch;
  }
  & .facts {
    display: grid;
    gap: 12px;
    margin: 28px 0;
  }
  & .facts div {
    padding: 16px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  & .facts dt {
    color: #626262;
    font-size: 0.85rem;
  }
  & .facts dd {
    margin: 4px 0 0;
    font-weight: 700;
  }
  & li {
    margin: 8px 0;
  }
  & a {
    text-underline-offset: 4px;
  }
  & .lesson {
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    padding: 20px;
    margin: 16px 0;
  }
  & .lesson h3 {
    margin: 4px 0 16px;
    font-size: 1.15rem;
  }
  & .lesson p:last-child {
    margin-bottom: 0;
  }
  & .note {
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
    margin: 20px 0;
  }
  & .note p:first-child {
    margin-top: 0;
  }
  & .note p:last-child {
    margin-bottom: 0;
  }
  & details {
    padding: 16px 0;
    border-bottom: 1px solid #d7d7d7;
  }
  & summary {
    cursor: pointer;
    font-weight: 700;
  }
  @media (min-width: 640px) {
    & .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    & .lesson {
      padding: 24px;
    }
  }
  & > nav {
    font-size: 0.8rem;
    color: #626262;
    margin-bottom: 25px;
  }
  & h1 {
    font-weight: 550;
    letter-spacing: -0.045em;
  }
  & h2 {
    font-weight: 550;
    letter-spacing: -0.035em;
  }
  & .course-hero > .eyebrow {
    letter-spacing: 0.07em;
    text-transform: uppercase;
    font-size: 0.75rem;
  }
  & .course-hero > h1 {
    max-width: 22ch;
    font-size: clamp(2.7rem, 6vw, 4.6rem);
  }
  & .course-hero > .subtitle {
    font-family: inherit;
    font-style: normal;
    color: #333333;
    font-size: clamp(1.5rem, 3vw, 2.15rem);
    max-width: 40ch;
  }
  & .course-hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px 22px;
    margin: 28px 0 40px;
  }
  & .course-hero-actions span {
    color: #626262;
    font-size: 0.85rem;
  }
  & .facts {
    gap: 15px;
  }
  & .facts div {
    padding: 24px;
    border: 1px solid #cccccc;
    background: #ffffff;
    border-radius: 12px;
  }
  & .difficulty-hero {
    background: #f5f5f5;
    border: 0;
  }
  & .mentor-intro {
    border-block: 1px solid #cccccc;
    padding: 24px 0;
    margin-top: 36px;
  }
  & .course-hero {
    min-height: calc(100svh - 170px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px 0;
  }
  & .course-hero > h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 650;
  }
  & .course-hero > .subtitle {
    font-size: clamp(1.2rem, 2.4vw, 1.65rem);
    max-width: 50ch;
  }
  & .difficulty-hero {
    padding: 30px 0;
    border-block: 1px solid #bbb;
    border-radius: 0;
    background: transparent;
  }
  & .facts div {
    border: 0;
    border-bottom: 1px solid #ccc;
    padding: 18px 0;
    border-radius: 0;
    background: transparent;
  }
  & .note {
    background: transparent;
    border-left: 2px solid #999;
    padding: 0 0 0 22px;
    border-radius: 0;
  }
  & .lesson {
    border-radius: 3px;
  }
`
