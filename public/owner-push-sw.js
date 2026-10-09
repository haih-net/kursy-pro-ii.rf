/* global self, clients */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  event.waitUntil(
    self.registration.showNotification(data.title || 'Курсы про ИИ', {
      body: data.body || 'Откройте кабинет преподавателя.',
      tag: 'course-applications',
    }),
  )
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow('/owner/notifications'))
})
