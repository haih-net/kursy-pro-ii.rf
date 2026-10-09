import { data, type MetaFunction } from 'react-router'
import { NotFoundPage } from '../Custom/pages/NotFoundPage'
import { unavailableSeoMeta } from '../components/seo/SeoHeaders'

export const meta: MetaFunction = unavailableSeoMeta
export const loader = (): ReturnType<typeof data<{ statusCode: number }>> =>
  data({ statusCode: 404 }, { status: 404 })
export { NotFoundPage as default }
