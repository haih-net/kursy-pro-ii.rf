import { styled } from '@linaria/react'

export const OwnerNotificationsStyled = styled.section`
  & .application-text {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
  & h1 {
    font-size: clamp(2rem, 6vw, 3.5rem);
  }
  & p {
    max-width: 72ch;
  }
  & .slots {
    display: grid;
    gap: 12px;
    padding: 0;
    list-style: none;
  }
  & .slots li {
    padding: 16px;
    border: 1px solid #d7d7d7;
    border-radius: 12px;
    background: #f5f5f5;
  }
  & .slots strong,
  & .slots span {
    display: block;
    margin-bottom: 6px;
  }
  & form {
    display: grid;
    gap: 16px;
    max-width: 650px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 12px;
  }
  & label {
    display: grid;
    gap: 6px;
  }
  & input,
  & select,
  & textarea,
  & button {
    font: inherit;
    padding: 12px;
    border: 1px solid #999999;
    border-radius: 6px;
    max-width: 100%;
    min-width: 0;
  }
  & button {
    background: #ad3b20;
    color: white;
    cursor: pointer;
  }
  & button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  & .consent {
    display: flex;
    align-items: start;
  }
  & .consent input {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    padding: 0;
    margin-top: 3px;
  }
  & .trap {
    display: none;
  }
  & :focus-visible {
    outline: 3px solid #ad3b20;
    outline-offset: 3px;
  }
  @media (min-width: 700px) {
    & .slots {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`
