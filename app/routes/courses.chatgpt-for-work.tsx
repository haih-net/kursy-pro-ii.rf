import type { MetaFunction } from 'react-router'
import { ChatGptCoursePage } from '../Custom/pages/ChatGptCoursePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'ChatGPT для работы — курс на 150 часов',
    description:
      '150 часов: ИИ и модели, инструменты ChatGPT, Google, Telegram, Scheduled, изображения, Sites, Codex и свои агенты. Выберите нужные темы.',
    path: '/courses/chatgpt-for-work',
    noindex: true,
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ChatGptCoursePage as default }
