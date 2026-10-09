import type { MetaFunction } from 'react-router'
import { AboutPage } from '../Custom/pages/AboutPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Николай Ланец — обо мне и моих курсах по ИИ',
    description:
      'Николай Ланец (Fi1osof): больше 19 лет в IT, от фриланса до СберКласса, СберЛаборатории и международных компаний. Сейчас — практическое применение ИИ и личные занятия.',
    path: '/about',
    noindex: true,
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { AboutPage as default }
