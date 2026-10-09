import type * as React from 'react'
import { Link } from 'react-router'
import { chatGptCourse } from '../ChatGptCoursePage/data'
import { courseHours, courseModules } from '../ChatGptCoursePage/program'
import { hourlyRate } from '../ChatGptCoursePage/catalog'
import { formatCoursePrice } from '../ChatGptCoursePage/CourseBuilder/data'
import { CoursesStyled } from './styles'
export const CoursesPage: React.FC = () => (
  <CoursesStyled>
    <div className="catalog-hero">
      <p className="label">ЛИЧНО ВЕДУ · ОБЪЯСНЯЮ · ОТВЕЧАЮ</p>
      <h1 tabIndex={-1}>Курсы под ваши задачи</h1>
      <p className="intro">
        Я веду курсы по освоению ИИ для личных задач и работы. Диалоговые
        лекции: понятная программа, разбор примеров и вопросы мне по ходу
        занятия.
      </p>
      <article>
        <p className="label">От первого знакомства до сайтов и агентов</p>
        <h2>
          <Link to={chatGptCourse.path}>{chatGptCourse.title}</Link>
        </h2>
        <p>
          <strong>{chatGptCourse.subtitle}</strong>
        </p>
        <p>{chatGptCourse.description}</p>
        <ul>
          <li>
            {courseModules.length} самостоятельных тем. Полная программа —{' '}
            {courseHours} ч.
          </li>
          <li>
            Содержание от простого к сложному видно сразу. Глубину определим в
            диалоге.
          </li>
          <li>
            {formatCoursePrice(hourlyRate)} за час индивидуально. Для групп —
            отдельные коэффициенты.
          </li>
          <li>Можно начать с одной темы и дополнить программу позже.</li>
        </ul>
        <Link className="course-link" to={chatGptCourse.path}>
          Выбрать вариант и собрать курс →
        </Link>
      </article>
    </div>
    <h2>Содержание можно изучить до записи</h2>
    <p>
      У каждой темы есть понятное содержание, примеры и план занятий по два
      часа. Программа помогает решить, нужен ли вам именно этот разбор. Вопросы
      входят в занятия, обязательных домашних заданий нет.
    </p>
  </CoursesStyled>
)
