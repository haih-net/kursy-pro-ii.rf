import type { Config } from '@react-router/dev/config'
export default {
  ssr: true,
  prerender: ['/', '/courses', '/about', '/terms', '/courses/chatgpt-for-work'],
  routeDiscovery: { mode: 'initial' },
} satisfies Config
