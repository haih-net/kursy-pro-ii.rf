import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const HeaderNavStyled = styled.nav`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 16px 20px;
  max-height: calc(100dvh - 100px);
  overflow-y: auto;
  background: ${theme.backgrounds.page};
  box-shadow: 0 12px 24px #25252512;
  border-bottom: 1px solid ${theme.colors.border};
  font-size: 14px;
  &[data-open='true'] {
    display: block;
  }
  .navigation-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .navigation-links > a {
    padding: 10px 0;
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }
  .navigation-links > a:hover,
  .navigation-links > a[aria-current='page'] {
    border-bottom-color: ${theme.colors.primary};
  }
  .navigation-links > a[aria-current='page'] {
    font-weight: 600;
  }
  .header-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid ${theme.colors.border};
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    &,
    &[data-open='true'] {
      display: contents;
    }
    .navigation-links {
      grid-column: 2;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4px 20px;
      max-width: 320px;
    }
    .header-actions {
      grid-column: 3;
      justify-self: end;
      justify-content: flex-end;
      flex-wrap: nowrap;
      padding: 0;
      margin: 0;
      border: 0;
    }
  }
`

export const HeaderStyled = styled.header`
  position: relative;
  z-index: 300;
  background: ${theme.backgrounds.page};
  border-bottom: 1px solid ${theme.colors.foreground};
  a {
    color: inherit;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.05rem;
    justify-self: start;
  }
  .brand-mark {
    font-size: 1.35rem;
    font-weight: 800;
    color: ${theme.colors.primary};
    letter-spacing: -0.08em;
    padding-right: 12px;
    border-right: 1px solid #bbb;
  }
  .brand-author {
    display: block;
    font-size: 0.7rem;
    font-weight: 400;
    color: ${theme.colors.text.secondary};
  }
  .header-inner {
    min-height: 80px;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    @media (min-width: ${theme.breakpoints.lg}px) {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    }
  }
  .menu-toggle {
    display: flex;
    background: transparent;
    border: 1px solid ${theme.colors.border};
    border-radius: 3px;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    color: inherit;
    @media (min-width: ${theme.breakpoints.lg}px) {
      display: none;
    }
  }
  .header-actions .feedback-button,
  .header-actions .signin-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 36px;
    padding: 6px 8px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
    color: ${theme.colors.foreground};
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
    text-decoration: none;
  }
  .header-actions .feedback-button:hover,
  .header-actions .signin-link:hover {
    background: #f3f3f3;
  }
  .header-actions > a:focus-visible,
  .header-actions > button:focus-visible,
  .account-menu summary:focus-visible {
    border-color: ${theme.colors.primary};
  }
  .header-actions > a svg,
  .header-actions > button svg {
    flex-shrink: 0;
  }
  @media (max-width: ${theme.breakpoints.lg - 1}px) {
    .header-actions .feedback-button,
    .header-actions .signin-link {
      min-height: 44px;
    }
  }
  .account-menu {
    position: relative;
    min-width: 0;
  }
  .account-menu summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: 700;
    list-style: none;
  }
  .account-menu summary::-webkit-details-marker {
    display: none;
  }
  .account-menu summary:hover,
  .account-menu[open] summary {
    background: #f3f3f3;
  }
  .account-name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .account-chevron {
    display: block;
    flex-shrink: 0;
  }
  .account-dropdown {
    padding: 10px;
    margin-top: 8px;
    border: 1px solid ${theme.colors.border};
    border-radius: 12px;
    background: white;
    box-shadow: 0 12px 32px #2525251a;
    min-width: 220px;
    @media (min-width: ${theme.breakpoints.lg}px) {
      position: absolute;
      right: 0;
      top: 100%;
    }
  }
  .account-dropdown p {
    margin: 4px 12px 8px;
    color: ${theme.colors.text.secondary};
    font-size: 12px;
  }
  .account-dropdown a,
  .account-dropdown button {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: ${theme.colors.text.primary};
  }
  .account-dropdown a:hover {
    background: #f3f3f3;
  }
  .account-dropdown button {
    margin-top: 4px;
    border-top: 1px solid ${theme.colors.border};
  }
`
