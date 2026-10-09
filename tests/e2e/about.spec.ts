import { expect, test } from '@playwright/test'

test('личное предложение и страница автора доступны из курса без перезагрузки', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/courses/chatgpt-for-work')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await expect(page.locator('.mentor-intro')).toContainText(
    'Курс веду я, Николай Ланец',
  )
  await page.evaluate(() => Reflect.set(window, '__authorNavigation', true))
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Обо мне' })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page).toHaveTitle('Николай Ланец — обо мне и моих курсах по ИИ')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Николай Ланец',
  )
  await expect(page.locator('.hero')).toContainText('Я веду их лично')
  const portrait = page.getByRole('img', {
    name: 'Николай Ланец — автор и ведущий курса',
  })
  await expect(portrait).toBeVisible()
  await expect
    .poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0)
  expect(
    await page.evaluate(() => Reflect.get(window, '__authorNavigation')),
  ).toBe(true)
  await page.getByRole('link', { name: 'Собрать свой курс →' }).click()
  await expect(page).toHaveURL(/\/courses\/chatgpt-for-work$/)
  await page.goBack()
  await expect(page).toHaveURL(/\/about$/)
  expect((await page.reload())?.status()).toBe(200)
  await page.setViewportSize({ width: 360, height: 800 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  expect(errors).toEqual([])
})
