import type * as React from 'react'
import { Link } from 'react-router'
import { TermsPageStyled } from './styles'
import { terms } from './data'

export const TermsPage: React.FC = () => (
  <TermsPageStyled aria-labelledby="terms-title">
    <h1 id="terms-title" tabIndex={-1}>
      Определения для курсов
    </h1>
    <section aria-labelledby="main-glossary-title">
      <h2 id="main-glossary-title">Общие термины ИИ</h2>
      <p>
        <a href="https://что-такое-ии.рф/terms">
          Все общие термины про ИИ — в основном справочнике «Что такое ИИ»
        </a>
        . Здесь собраны определения, связанные с особенностями курсов, учебных
        задач и способов работы. Общие понятия сохраняют смысл основного
        справочника, а местные статьи уточняют их применение в этом проекте.
      </p>
    </section>
    <dl>
      {terms.map((term) => (
        <div key={term.id} id={term.id}>
          <dt>{term.name}</dt>
          <dd>{term.definition}</dd>
        </div>
      ))}
    </dl>
    <section>
      <h2>Агент, сценарий и ИИ-чат в одной задаче</h2>
      <p>
        <a href="https://что-такое-ии.рф/terms/agent">ИИ-агент</a> — система из
        LLM и обвязок. Сценарий описывает порядок действий.{' '}
        <a href="https://что-такое-ии.рф/terms/ai-chat">ИИ-чат</a> — приложение
        или сервис с диалоговым интерфейсом. Эти понятия обозначают разные
        стороны работы, а не взаимоисключающие виды помощников.
      </p>
      <p>
        Например, вы открываете ИИ-чат, чтобы подготовить встречу. Агент
        помогает выполнить сценарий: уточнить участников, подобрать время и
        подготовить приглашение. Доступ к календарю и право создать событие
        зависят от конкретной системы. Заранее заданный порядок действий и
        ограничения самостоятельности сами по себе не отменяют определение
        агента.
      </p>
    </section>
    <p>
      <Link to="/courses/chatgpt-for-work">Вернуться к программе курса</Link>
    </p>
  </TermsPageStyled>
)
