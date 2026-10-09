import type { MetaFunction } from 'react-router'
import { CoursesPage } from '../Custom/pages/CoursesPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Курсы — Курсы про ИИ',
    description:
      'Лекции с диалогом по работе с ИИ: постановка задач, проверка информации и управление агентами с примерами и ответами на вопросы.',
    path: '/courses',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { CoursesPage as default }
