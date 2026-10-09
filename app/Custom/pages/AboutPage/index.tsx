import type * as React from 'react'
import { Link } from 'react-router'
import { MentorPortrait } from '../../components/MentorPortrait'
import { AboutStyled } from './styles'

const googleQuestions: readonly string[] = [
  'Кто такой Николай Философ Ланец (Fi1osof)?',
  'Какой опыт у Николая Ланца (Fi1osof) в обучении и работе с ИИ?',
]

export const AboutPage: React.FC = () => (
  <AboutStyled>
    <nav aria-label="Хлебные крошки">
      <Link to="/">Главная</Link> / Обо мне
    </nav>
    <div className="hero">
      <div>
        <p className="eyebrow">ОБО МНЕ · FI1OSOF</p>
        <h1 tabIndex={-1}>Николай Ланец</h1>
        <p className="intro">
          Больше 19 лет в IT. От специалиста сотовой компании и фриланса — до
          больших технологических компаний.
        </p>
        <p>
          Я работал в СберКлассе, в СберЛаборатории виртуальной и дополненной
          реальности, в европейских и американских компаниях. Был разработчиком
          и руководителем команд, занимался собственными проектами.
        </p>
        <p>
          Сейчас исследую практическое применение ИИ: как использовать его в
          работе, учиться с его помощью и превращать идеи в работающие решения.
        </p>
        <p>
          На этом сайте — мои курсы. Я веду их лично: объясняю, показываю на
          примерах и отвечаю на ваши вопросы.
        </p>
      </div>
      <MentorPortrait className="portrait" />
    </div>

    <section className="google-check" aria-labelledby="ask-google">
      <p className="eyebrow">ПОЗНАКОМЬТЕСЬ СО МНОЙ ЧЕРЕЗ ПОИСК</p>
      <h2 id="ask-google">
        Не верьте мне —<br />
        спросите у Google.
      </h2>
      <p>
        Моя работа оставила большой публичный след. Посмотрите, что Google
        расскажет обо мне, моём опыте и занятиях с людьми. Выберите вопрос — или
        задайте свой.
      </p>
      <div className="google-questions">
        {googleQuestions.map((question) => (
          <a
            key={question}
            href={`https://www.google.com/search?${new URLSearchParams({ udm: '50', q: question })}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{question}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="link-note">
        Запросы откроются в новой вкладке Google с режимом ИИ.
      </p>
    </section>

    <section className="closing">
      <h2>А на занятиях разберём вашу задачу</h2>
      <p>
        Вы можете начать с нуля или прийти с конкретным вопросом. Я помогу
        разобраться, что поручить ИИ, как проверить ответ и что делать дальше.
        Можно уточнять, спорить и возвращаться к непонятному — для этого и нужен
        живой диалог.
      </p>
      <div className="actions">
        <Link className="primary" to="/courses/chatgpt-for-work">
          Собрать свой курс →
        </Link>
        <a
          href="https://t.me/Fi1osof"
          target="_blank"
          rel="noopener noreferrer"
        >
          Написать мне ↗
        </a>
      </div>
    </section>
  </AboutStyled>
)
