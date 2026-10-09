import { expect, test } from '@playwright/test'

test('форма ждёт пять секунд, сохраняет текст после ошибки и отправляет выбор', async ({
  page,
}) => {
  const hydrationErrors: string[] = []
  page.on('pageerror', (error) => hydrationErrors.push(error.message))
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      /hydration|Minified React error/i.test(message.text())
    ) {
      hydrationErrors.push(message.text())
    }
  })
  let submitted: Record<string, unknown> | undefined
  let attempts = 0
  await page.route('**/api', async (route) => {
    const body = route.request().postDataJSON()
    if (body.query?.includes('PrepareCourseApplication')) {
      await route.fulfill({
        json: {
          data: {
            prepareCourseApplication: { token: 'test-token', waitMs: 5000 },
          },
        },
      })
    } else if (body.query?.includes('SubmitCourseApplication')) {
      attempts++
      submitted = body.variables.input
      await route.fulfill({
        json:
          attempts === 1
            ? {
                errors: [
                  {
                    message: 'Не удалось отправить заявку. Повторите попытку.',
                    extensions: { code: 'DELIVERY_FAILED' },
                  },
                ],
              }
            : {
                data: {
                  submitCourseApplication: {
                    id: 'test',
                    message: 'Заявка отправлена. Я свяжусь с вами.',
                  },
                },
              },
      })
    } else {
      await route.continue()
    }
  })
  await page.goto('/courses/chatgpt-for-work?preset=visual')
  await page
    .getByRole('button', { name: 'Записаться на выбранные темы' })
    .click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(
    dialog.getByRole('textbox', { name: 'Ваши контакты и пожелания' }),
  ).toHaveCount(0)
  await expect(dialog).toContainText('18 ч.')
  await expect(dialog).toContainText(/36\s000/)
  await expect(
    dialog.getByRole('textbox', { name: 'Ваши контакты и пожелания' }),
  ).toBeVisible({ timeout: 8000 })
  await dialog
    .getByRole('textbox', { name: 'Ваши контакты и пожелания' })
    .fill('Telegram @student. Хочу создавать изображения.')
  await dialog.getByRole('button', { name: 'Отправить заявку' }).click()
  await expect(dialog.getByRole('alert')).toContainText('Не удалось отправить')
  await expect(
    dialog.getByRole('textbox', { name: 'Ваши контакты и пожелания' }),
  ).toHaveValue('Telegram @student. Хочу создавать изображения.')
  await dialog.getByRole('button', { name: 'Отправить заявку' }).click()
  await expect(
    dialog.getByRole('heading', { name: 'Заявка отправлена' }),
  ).toBeVisible()
  expect(submitted).toMatchObject({
    formatId: 'individual',
    message: 'Telegram @student. Хочу создавать изображения.',
    topicIds: [
      'image-basics',
      'image-brief',
      'image-editing',
      'image-series',
      'image-publishing',
    ],
  })
  await dialog.getByRole('button', { name: 'Вернуться к программе' }).click()
  await expect(dialog).not.toBeVisible()
  expect(hydrationErrors).toEqual([])
})

test('главная, наборы и форма помещаются на узком экране; Escape возвращает фокус', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  for (const url of ['/', '/about', '/courses']) {
    await page.goto(url)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
  }
  await page.goto('/')
  await page.getByRole('link', { name: 'Выбрать этот набор' }).nth(2).click()
  await expect(page.getByTestId('selected-hours')).toHaveText('18 ч.')
  await page
    .getByRole('button', { name: 'Записаться на выбранные темы' })
    .click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(
    await page
      .getByRole('dialog')
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Записаться на выбранные темы' }),
  ).toBeFocused()
})
