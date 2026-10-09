import type { MetaFunction } from 'react-router'
import { HomePage } from '../Custom/pages/HomePage'
import { courseSite } from '../Custom/site'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: courseSite.name,
    description: courseSite.description,
    path: '/',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { HomePage as default }
