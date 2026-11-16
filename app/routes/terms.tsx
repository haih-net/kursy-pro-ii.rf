import type { MetaFunction } from 'react-router'
import { TermsPage } from '../Custom/pages/Terms'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Определения для курсов по ИИ',
    description:
      'Термины учебных задач: сценарий и его связь с агентом и ИИ-чатом. Ссылка на основной справочник общих понятий ИИ.',
    path: '/terms',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { TermsPage as default }
