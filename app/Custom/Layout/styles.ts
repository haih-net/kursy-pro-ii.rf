import { styled } from '@linaria/react'
import { theme } from '../theme'

export const CustomLayoutSectionStyled = styled.section`
  max-width: 1328px;
  padding: 44px 24px;
  margin: auto;

  @media (min-width: ${theme.breakpoints.sm}px) {
    padding: 64px 40px;
  }
`

export const CustomLayoutGridStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: ${theme.breakpoints.xs}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${theme.breakpoints.sm}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

export const CustomLayoutMainStyled = styled.main`
  flex: 1;
  min-width: 0;
  padding: 30px 0 65px;
  min-height: 65vh;
  @media (min-width: 768px) {
    padding-top: 40px;
  }
`

export const CustomLayoutStyled = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  padding: 0 20px;
  @media (min-width: 768px) {
    padding-inline: 40px;
  }
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.foreground};
  background: ${theme.backgrounds.page};
  .ai-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 14px 20px;
    background: ${theme.colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    transition: background 0.2s;
    text-decoration: none;
  }
  .ai-button:hover {
    background: #8d2c18;
    text-decoration: none;
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
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    padding: 12px 20px;
    background: white;
    z-index: 1100;
  }
  .skip-link:focus {
    top: 12px;
  }
`
