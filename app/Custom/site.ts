export interface SiteConfig {
  origin: string
  name: string
  language: string
  description: string
}

export const courseSite: SiteConfig = {
  origin: 'https://' + new URL('https://курсы-про-ии.рф').host,
  name: 'Курсы про ИИ',
  language: 'ru',
  description:
    'Мои курсы по работе с ИИ. Я Николай Ланец: программирую с 2007 года и лично веду диалоговые занятия по ChatGPT для частных лиц и команд.',
}
