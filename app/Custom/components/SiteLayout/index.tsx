import type * as React from 'react'
import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { courseSite } from '../../site'
import { LayoutStyled } from './styles'

export const SiteLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    document
      .querySelector<HTMLElement>('main h1')
      ?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <LayoutStyled>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <header>
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            ии
          </span>
          <span>
            {courseSite.name}
            <span className="brand-author">Николай Ланец · Fi1osof</span>
          </span>
        </Link>
        <nav aria-label="Основная навигация">
          <NavLink to="/" end>
            Главная
          </NavLink>
          <NavLink to="/courses">Курсы</NavLink>
          <NavLink to="/about">Обо мне</NavLink>
        </nav>
        <a className="header-contact" href="mailto:n.lanets@freecode.academy">
          n.lanets@freecode.academy
        </a>
      </header>
      <main id="main">{children}</main>
      <footer>
        <span>Мои курсы по ИИ · Николай Ланец</span>
        <Link to="/about">Обо мне</Link>
        <Link to="/courses">Все курсы</Link>

        <a
          href="https://fi1osof.ru"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Официальный сайт Николая Ланца — открыть в новой вкладке"
        >
          By 𝕱 ↗
        </a>
      </footer>
    </LayoutStyled>
  )
}
