import type * as React from 'react'
import { Link } from 'react-router'
import { MentorPortrait } from '../../components/MentorPortrait'
import {
  courseHours,
  courseModules,
  courseSections,
} from '../ChatGptCoursePage/program'
import {
  coursePresets,
  getCourseTotals,
  formatCoursePrice,
} from '../ChatGptCoursePage/CourseBuilder/data'
import { HomeStyled } from './styles'

const coursePath = '/courses/chatgpt-for-work'
export const HomePage: React.FC = () => (
  <HomeStyled>
    <section className="home-intro">
      <div className="hero-copy">
        <p className="eyebrow">Личные занятия с Николаем Ланцом</p>
        <h1 tabIndex={-1}>
          Научитесь работать с ИИ
          <br />
          на своих задачах.
        </h1>
        <p className="lead">
          Я покажу, как использовать ChatGPT: задавать вопросы, проверять
          ответы, работать с документами и изображениями. А если хотите
          создавать своё — разберём сайты, сервисы и агентов.
        </p>
        <p className="offer">
          Вы выбираете нужные темы. Я объясняю, показываю на примерах и отвечаю
          на вопросы по ходу занятия.
        </p>
        <div className="actions">
          <Link className="button-primary" to={coursePath}>
            Выбрать занятия <span aria-hidden="true">→</span>
          </Link>
          <span>
            От 4 000 ₽ за занятие
            <br />
            <small>2 обычных часа · индивидуально</small>
          </span>
        </div>
      </div>
      <figure className="mentor-card">
        <MentorPortrait className="portrait" />
        <figcaption>
          <strong>Николай Ланец / Fi1osof</strong>
          <span>
            Программирую с 2007 года.
            <br />
            Курс веду лично.
          </span>
          <Link to="/about">Об опыте и подходе →</Link>
        </figcaption>
      </figure>
      <div className="hero-footer">
        <p>
          Онлайн. Индивидуально или с командой.
          <br />
          Программу и время согласуем до начала.
        </p>
        <a href="#course-program">Что можно изучить ↓</a>
      </div>
    </section>

    <section className="program-section" id="course-program">
      <div className="section-heading">
        <p className="eyebrow">Программа курса</p>
        <div>
          <h2>ChatGPT для работы</h2>
          <p>
            От первого сообщения до своих инструментов. {courseModules.length}{' '}
            тем, {courseHours} часов в полной программе. Проходить всё не
            обязательно — можно начать с одной темы.
          </p>
          <Link className="text-link" to={coursePath}>
            Открыть полный план и собрать курс →
          </Link>
        </div>
      </div>
      <div className="program-list">
        {courseSections.map((section, index) => (
          <Link
            key={section.id}
            to={`${coursePath}#section-${section.id}`}
            className="program-row"
          >
            <span className="section-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>
              <strong>{section.title}</strong>
              <span className="section-description">{section.description}</span>
            </span>
            <span className="section-hours">
              {section.topics.reduce((sum, topic) => sum + topic.hours, 0)} ч.{' '}
              <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </section>

    <section className="packages-section">
      <div className="section-heading">
        <p className="eyebrow">Можно начать так</p>
        <div>
          <h2>Одна тема или готовый набор</h2>
          <p>
            Три варианта из программы для разных задач. В конструкторе можно
            изменить состав и сразу увидеть новый расчёт.
          </p>
        </div>
      </div>
      <div className="packages">
        {coursePresets
          .filter((preset) =>
            ['introduction', 'foundation', 'visual'].includes(preset.id),
          )
          .map((preset) => {
            const totals = getCourseTotals(preset.stageIds)
            return (
              <article key={preset.id}>
                <div>
                  <h3>{preset.title}</h3>
                  <p>{preset.description}</p>
                </div>
                <div className="package-price">
                  <strong>{formatCoursePrice(totals.price)}</strong>
                  <span>{totals.hours} ч. · индивидуально</span>
                </div>
                <Link
                  className="button-secondary"
                  to={`${coursePath}?preset=${preset.id}#program`}
                >
                  Выбрать этот набор →
                </Link>
              </article>
            )
          })}
      </div>
      <p className="small-note">
        Базовая ставка — 2 000 ₽ за 60 минут. Для 2–5 человек — ×1,5, для 6–10 —
        ×2 за всю группу. Для большей команды состав и стоимость обсуждаем
        отдельно.
      </p>
    </section>

    <section id="how" className="how-section">
      <div className="section-heading">
        <p className="eyebrow">Как проходят занятия</p>
        <div>
          <h2>
            Весь материал — на встрече.
            <br />
            Вопросы — по ходу разбора.
          </h2>
          <p>
            Я объясняю выбранную тему и показываю действия на примерах. Вы
            можете уточнять, возвращаться к непонятному и обсуждать свою задачу.
            Глубину разбора определим в диалоге: не нужно заранее оценивать свой
            уровень.
          </p>
          <p>
            Занятие длится два обычных часа. Обязательных домашних заданий и
            зачётов нет. Повторять примеры между встречами можно в своём темпе.
          </p>
          <p>
            Для записи выберите темы и оставьте контакты в форме. Я свяжусь с
            вами, чтобы уточнить задачу, программу и время. Отправка заявки не
            требует оплаты.
          </p>
          <a className="text-link" href="mailto:n.lanets@freecode.academy">
            Обсудить задачу: n.lanets@freecode.academy
          </a>
        </div>
      </div>
    </section>

    <section className="faq">
      <div className="section-heading">
        <p className="eyebrow">До записи</p>
        <h2>Что ещё стоит знать</h2>
      </div>
      <div className="faq-content">
        <details>
          <summary>Можно ли прийти совсем без опыта?</summary>
          <p>
            Да. Начнём с первого сообщения, уточнения задачи и проверки ответа.
            Для знакомства с ИИ программирование не требуется. Для сложных тем в
            программе указано, что уже нужно уметь.
          </p>
        </details>
        <details>
          <summary>Нужно покупать весь курс на 150 часов?</summary>
          <p>
            Нет. Это объём всей программы. Можно заказать одну тему, готовый
            набор или свой вариант, а о продолжении решить после занятия.
          </p>
        </details>
        <details>
          <summary>Понадобятся ли платные сервисы?</summary>
          <p>
            Подписки, API, домен и хостинг оплачиваются отдельно, если нужны
            выбранной теме. Их необходимость и доступность обсудим до начала
            занятий. Рабочую почту и личные документы подключать не обязательно:
            используем учебные примеры.
          </p>
        </details>
        <details>
          <summary>Что означают уровни сложности?</summary>
          <p>
            Это части содержания одной темы. Вы выбираете тему целиком, а
            глубину разбора определим вместе. Уровни не меняют часы и цену темы.
          </p>
        </details>
      </div>
    </section>
  </HomeStyled>
)
