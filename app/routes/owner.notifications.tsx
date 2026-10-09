import type { MetaFunction } from 'react-router'
import { OwnerNotificationsPage } from '../Custom/pages/OwnerNotificationsPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Уведомления преподавателя — Курсы про ИИ',
    description: 'Уведомления преподавателя',
    path: '/owner/notifications',
    noindex: true,
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { OwnerNotificationsPage as default }
