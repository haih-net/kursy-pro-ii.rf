import { styled } from '@linaria/react'
import { theme } from '.'
export const HtmlStyled = styled.html`
  color: ${theme.colors.foreground};
  background: #fff;
  font-family: ${theme.font};
  line-height: 1.6;
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  :where(&) a {
    color: ${theme.colors.primary};
    text-decoration: none;
    text-underline-offset: 5px;
  }
  :where(&) a:hover {
    text-decoration: underline;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
  }
  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
  ::selection {
    background: #f4d9d1;
    color: ${theme.colors.foreground};
  }
  :where(&) :is(a, button, summary) {
    border: 1px solid transparent;
  }
  :focus {
    outline: none;
  }
  :focus-visible,
  input:focus,
  textarea:focus,
  select:focus {
    border-color: ${theme.colors.primary};
  }
  h1,
  h2,
  h3 {
    text-wrap: balance;
  }
  h1:focus {
    outline: none;
  }
  button {
    touch-action: manipulation;
  }
  button:enabled {
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  img {
    max-width: 100%;
  }
  [id] {
    scroll-margin-top: 28px;
  }
  @media (prefers-reduced-motion: no-preference) {
    a,
    button {
      transition:
        background 150ms,
        border-color 150ms;
    }
  }
`
