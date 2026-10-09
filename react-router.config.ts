import type { Config } from '@react-router/dev/config'
export default {
  ssr: true,
  prerender: [
    '/',
    '/courses',
    '/about',
    '/courses/chatgpt-for-work',
    '/owner/notifications',
  ],
  routeDiscovery: { mode: 'initial' },
} satisfies Config
