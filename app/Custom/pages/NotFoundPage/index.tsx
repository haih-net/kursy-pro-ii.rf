import type * as React from 'react'
import { Link } from 'react-router'
import { NotFoundStyled } from './styles'

export const NotFoundPage: React.FC = () => (
  <NotFoundStyled>
    <p className="code" aria-hidden="true">
      404
    </p>
    <h1 tabIndex={-1}>Страница не найдена</h1>
    <p>
      По этому адресу нет страницы. Вернитесь на главную — там можно выбрать
      курс и познакомиться со мной.
    </p>
    <Link className="button-primary" to="/">
      На главную
    </Link>
  </NotFoundStyled>
)
