import { styled } from '@linaria/react'
export const DocumentStyled = styled.html`
  color: #252525;
  background: #fff;
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.6;
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  a {
    color: inherit;
    text-underline-offset: 5px;
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
    color: #252525;
  }
  :focus-visible {
    outline: 3px solid #a73b22;
    outline-offset: 4px;
  }
  h1,
  h2,
  h3 {
    text-wrap: balance;
  }
  h1:focus {
    outline: none;
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
export const LayoutStyled = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  padding: 0 20px;
  .skip-link {
    position: absolute;
    left: 16px;
    top: -100px;
    padding: 12px;
    background: #fff;
    z-index: 10;
  }
  .skip-link:focus {
    top: 12px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.05rem;
  }
  .brand-mark {
    font-size: 1.35rem;
    font-weight: 800;
    color: #ad3b20;
    letter-spacing: -0.08em;
    padding-right: 12px;
    border-right: 1px solid #bbb;
  }
  .brand-author {
    display: block;
    font-size: 0.7rem;
    font-weight: 400;
    color: #666;
  }
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 24px;
    padding: 20px 0;
    border-bottom: 1px solid #252525;
  }
  > header nav {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
  }
  > header nav a {
    padding: 8px 0;
    text-decoration: none;
    font-size: 0.88rem;
    border-bottom: 2px solid transparent;
  }
  > header nav a:hover,
  > header nav a[aria-current='page'] {
    border-color: #ad3b20;
  }
  > header nav a[aria-current='page'] {
    font-weight: 650;
  }
  .header-contact {
    font-size: 0.8rem;
  }
  > main {
    padding: 30px 0 65px;
    min-height: 65vh;
  }
  > footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 18px 28px;
    border-top: 1px solid #252525;
    padding: 28px 0;
    color: #555;
    font-size: 0.85rem;
  }
  > footer > span {
    margin-right: auto;
  }
  .button-primary,
  .button-secondary {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 13px 21px;
    border-radius: 3px;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.5;
  }
  .button-primary {
    border: 1px solid #ad3b20;
    background: #ad3b20;
    color: #fff;
  }
  .button-primary:hover {
    background: #8d2c18;
    border-color: #8d2c18;
  }
  .button-secondary {
    border: 1px solid #999;
    background: #fff;
  }
  .button-secondary:hover {
    border-color: #252525;
    background: #f3f3f3;
  }
  @media (min-width: 768px) {
    padding: 0 40px;
    > main {
      padding-top: 40px;
    }
  }
`
