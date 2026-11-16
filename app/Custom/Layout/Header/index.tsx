import { useCallback, useEffect, useRef, useState } from 'react'
import type * as React from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { HeaderNavStyled, HeaderStyled } from './styles'
import { SignOutButton } from '../../components/Auth/SignOutButton'
import { theme } from '../../theme'
import { courseSite } from '../../site'
import { useAppContext } from 'app/Custom/components/AppContext'
import { UserAvatar } from 'app/Custom/components/UserAvatar'
import { MessageCircle, LogIn } from 'lucide-react'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const accountMenu = useRef<HTMLDetailsElement>(null)
  const header = useRef<HTMLElement>(null)
  const location = useLocation()
  const { user, userLoading = true, openFeedback } = useAppContext() ?? {}

  const handleFeedback = useCallback(() => {
    openFeedback?.()
    setIsOpen(false)
  }, [openFeedback])
  const closeMenu = useCallback(() => {
    setIsOpen(false)
    if (accountMenu.current) {
      accountMenu.current.open = false
    }
  }, [])
  const toggleMenu = useCallback(() => setIsOpen((previous) => !previous), [])
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (
      !event.currentTarget.contains(event.relatedTarget) &&
      event.relatedTarget !== toggle.current
    ) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggle.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    const media = window.matchMedia(`(min-width: ${theme.breakpoints.lg}px)`)
    const onResize = () => {
      if (media.matches) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      media.removeEventListener('change', onResize)
    }
  }, [isOpen])

  useEffect(() => {
    const closeAccount = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        accountMenu.current &&
        !accountMenu.current.contains(event.target)
      ) {
        accountMenu.current.open = false
      }
    }
    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && accountMenu.current?.open) {
        accountMenu.current.open = false
        accountMenu.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeAccount)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', closeAccount)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <HeaderStyled ref={header}>
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            ии
          </span>
          <span>
            {courseSite.name}
            <span className="brand-author">Николай Ланец · Fi1osof</span>
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path
              d={isOpen ? 'M18 6 6 18M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <HeaderNavStyled
          id="main-navigation"
          aria-label="Основная навигация"
          data-open={isOpen}
          onBlur={handleBlur}
        >
          <div className="navigation-links">
            <NavLink to="/courses" onClick={closeMenu}>
              Курсы
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              Обо мне
            </NavLink>
            <NavLink to="/terms" onClick={closeMenu}>
              Определения
            </NavLink>
            {user?.sudo === true && (
              <>
                <Link
                  to="/calls"
                  onClick={closeMenu}
                  aria-current={
                    location.pathname.startsWith('/calls') ? 'page' : undefined
                  }
                >
                  Видеозвонки
                </Link>
                <Link
                  to="/docs"
                  onClick={closeMenu}
                  aria-current={
                    location.pathname.startsWith('/docs') ? 'page' : undefined
                  }
                >
                  Документация
                </Link>
              </>
            )}
            {/* <Link
            to="/users"
            onClick={closeMenu}
            aria-current={
              location.pathname.startsWith('/users') ? 'page' : undefined
            }
          >
            Пользователи
          </Link> */}
          </div>
          <div className="header-actions">
            <button
              type="button"
              className="feedback-button"
              onClick={handleFeedback}
              disabled={!openFeedback}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Написать мне
            </button>
            {!userLoading &&
              (user ? (
                <details className="account-menu" ref={accountMenu}>
                  <summary
                    aria-label={`Меню пользователя: ${user.fullname || user.username || 'Мой аккаунт'}`}
                  >
                    <UserAvatar user={user} />
                    <span className="account-name">
                      {user.fullname || user.username || 'Мой аккаунт'}
                    </span>
                    <svg
                      className="account-chevron"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="account-dropdown">
                    <p>{user.sudo ? 'Администратор' : 'Мой аккаунт'}</p>
                    <Link to="/panel/profile" onClick={closeMenu}>
                      Мой профиль
                    </Link>
                    {user.sudo && (
                      <>
                        <Link to="/users" onClick={closeMenu}>
                          Пользователи
                        </Link>
                        <Link to="/admin-panel" onClick={closeMenu}>
                          Админка
                        </Link>
                      </>
                    )}
                    <SignOutButton variant="ghost" />
                  </div>
                </details>
              ) : (
                <Link className="signin-link" to="/signin" onClick={closeMenu}>
                  <LogIn size={16} aria-hidden="true" /> Войти
                </Link>
              ))}
          </div>
        </HeaderNavStyled>
      </div>
    </HeaderStyled>
  )
}
