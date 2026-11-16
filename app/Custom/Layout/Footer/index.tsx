import type * as React from 'react'
import { Link } from 'react-router'
import { FooterStyled } from './styles'

export const Footer: React.FC = () => (
  <FooterStyled>
    <span>Мои курсы по ИИ · Николай Ланец</span>
    <Link to="/about">Обо мне</Link>
    <Link to="/courses">Все курсы</Link>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://fi1osof.ru"
      aria-label="Разработка и сопровождение — 𝕱i1osof"
      title="Разработка и сопровождение — 𝕱i1osof"
    >
      By 𝕱 ↗
    </a>
  </FooterStyled>
)
