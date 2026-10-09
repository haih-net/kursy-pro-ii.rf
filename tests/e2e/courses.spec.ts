import { expect, test } from '@playwright/test'

test('каталог, полная программа и история работают без перезагрузки', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await page.evaluate(() => Reflect.set(window, '__courseNavigation', true))
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Курсы', exact: true })
    .click()
  await expect(page).toHaveURL(/\/courses$/)
  await expect(page).toHaveTitle('Курсы — Курсы про ИИ')
  await page
    .getByRole('link', { name: 'Выбрать вариант и собрать курс →' })
    .click()
  await expect(page).toHaveURL(/\/courses\/chatgpt-for-work$/)
  await expect(page).toHaveTitle('ChatGPT для работы — курс на 150 часов')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await expect(page.locator('.stage')).toHaveCount(37)
  await expect(page.getByTestId('lecture-format')).toContainText(
    'Вся информация передаётся на занятиях.',
  )
  await expect(page.getByTestId('optional-study')).toContainText(
    'Что делать вне занятий, каждый ученик решает сам.',
  )
  await page.locator('[data-topic-id="workflow"] summary').click()
  await expect(
    page.locator('[data-topic-id="workflow"] .topic-outline').first(),
  ).toBeVisible()
  expect(
    await page.evaluate(() => Reflect.get(window, '__courseNavigation')),
  ).toBe(true)
  await page.goBack()
  await expect(page).toHaveURL(/\/courses$/)
  await page.goForward()
  await expect(page).toHaveURL(/\/courses\/chatgpt-for-work$/)
  expect(errors).toEqual([])
})

test('прямой адрес, обновление и мобильная ширина', async ({ page }) => {
  const response = await page.goto('/courses/chatgpt-for-work')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  expect((await page.reload())?.status()).toBe(200)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
  await page.setViewportSize({ width: 390, height: 844 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page
    .getByText('Какова стоимость и можно ли записаться?', { exact: true })
    .click()
  await expect(
    page.getByText('Уровень темы цену не меняет.', {
      exact: false,
    }),
  ).toBeVisible()
  const missing = await page.goto('/courses/missing-course')
  expect(missing?.status()).toBe(404)
})

test('конструктор считает часы, группы и уровни без обязательных тем', async ({
  page,
}) => {
  await page.goto('/courses/chatgpt-for-work')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  const presets = page.getByRole('group', { name: 'Готовые варианты курса' })
  for (const [name, hours, price] of [
    ['Первое знакомство', '2 ч.', /4\s000/],
    ['Уверенный старт', '20 ч.', /40\s000/],
    ['Инструменты для работы', '44 ч.', /88\s000/],
    ['Изображения', '18 ч.', /36\s000/],
    ['Сайты, сервисы и агенты', '52 ч.', /104\s000/],
    ['Полный курс', '150 ч.', /300\s000/],
  ] as const) {
    await presets.getByRole('button', { name: new RegExp(name) }).click()
    await expect(page.getByTestId('selected-hours')).toHaveText(hours)
    await expect(page.getByTestId('selected-price')).toHaveText(price)
  }
  await page.getByLabel('Формат участия').selectOption('small-group')
  await expect(page.getByTestId('selected-price')).toHaveText(/450\s000/)
  await page.getByLabel('Формат участия').selectOption('corporate')
  await expect(page.getByTestId('selected-price')).toHaveText(/600\s000/)
  await page.locator('[data-topic-id="verification"] summary').press('Enter')
  await expect(page.locator('.stage select')).toHaveCount(0)
  await expect(
    page.locator('[data-topic-id="workflow"] summary .level-badge'),
  ).toHaveText(['Сложный'])
  await expect(
    page.locator('[data-topic-id="course-map"] summary .level-badge'),
  ).toHaveText(['Базовый'])
  await expect(page.locator('.stage-body > :not(.topic-levels)')).toHaveCount(0)
  await expect(page.locator('.stage-body .level-title')).toHaveCount(0)
  const bands = page.locator(
    '[data-topic-id="verification"] .topic-levels [data-level]',
  )
  await expect(bands).toHaveCount(2)
  for (const band of await bands.all()) {
    await expect(band).toBeVisible()
    await expect(band.locator('h4')).toHaveCount(1)
  }
  await expect(
    page.locator('[data-topic-id="verification"] .topic-outline'),
  ).toContainText('Если источники расходятся')
  await expect(
    page.locator('[data-topic-id="documents"] summary .level-badge'),
  ).toHaveText(['Средний'])
  await expect(page.getByTestId('selected-price')).toHaveText(/600\s000/)
  await expect(
    page.locator('[data-topic-id="course-map"] .topic-levels [data-level]'),
  ).toHaveCount(1)
  await expect(
    page.locator('[data-topic-id="workflow"] .topic-levels [data-level]'),
  ).toHaveCount(1)
  await expect(
    page.locator(
      '[data-topic-id="workflow"] .topic-levels [data-level="beginner"]',
    ),
  ).toHaveCount(0)
  await page.locator('input[value="course-map"]').uncheck()
  await expect(page.getByTestId('selected-price')).toHaveText(/592\s000/)
  await page.getByLabel('Для кого подбираем примеры').selectOption('lead')
  await expect(
    page.getByRole('button', { name: 'Оформить заявку ↗' }),
  ).toBeEnabled()
  await page.getByLabel('Формат участия').selectOption('large-group')
  await expect(page.getByTestId('selected-price')).toHaveText('По согласованию')
  await page.getByRole('button', { name: 'Очистить выбор' }).click()
  await expect(page.getByTestId('selected-hours')).toHaveText('0 ч.')
  await expect(
    page.getByRole('button', { name: 'Оформить заявку ↗' }),
  ).toBeDisabled()
})

test('разделы, занятия и сложность доступны во всей программе', async ({
  page,
}) => {
  await page.goto('/courses/chatgpt-for-work')
  await expect(
    page.getByRole('navigation', { name: 'Разделы курса' }),
  ).toHaveCount(0)
  await expect(page.locator('.course-section')).toHaveCount(10)
  await expect(page.locator('.topic-lessons li')).toHaveCount(75)
  for (const topic of await page.locator('.stage').all()) {
    await topic.locator('summary').click()
    await expect(topic.locator('.topic-outline')).toBeVisible()
    const expected = await topic
      .locator('.level-badge')
      .evaluateAll((els) => els.map((el) => el.getAttribute('data-level')))
    const actual = await topic
      .locator('.topic-levels > [data-level]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('data-level')))
    expect(actual).toEqual(expected)
    await expect(topic.locator('.topic-lessons')).toHaveCount(1)
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await expect(page.locator('.stage-body .level-title')).toHaveCount(0)
})

test('календарь удалён из навигации и недоступен по старому адресу', async ({
  page,
}) => {
  await page.goto('/courses/chatgpt-for-work')
  await expect(page.locator('a[href*="/calendar"]')).toHaveCount(0)
  expect((await page.goto('/calendar'))?.status()).toBe(404)
})

test('кабинет не показывает заявки без авторизации', async ({ page }) => {
  await page.goto('/owner/notifications')
  await page.getByLabel('Ключ преподавателя').fill('incorrect-key')
  await page.getByRole('button', { name: 'Открыть заявки' }).click()
  await expect(page.getByRole('status')).toHaveText('Нужен ключ преподавателя.')
  await expect(
    page.getByRole('button', { name: 'Проверить оба канала' }),
  ).toHaveCount(0)
})

test('компактные темы раскрываются независимо от выбора', async ({ page }) => {
  await page.goto('/courses/chatgpt-for-work')
  const topic = page.locator('[data-topic-id="course-map"]')
  const checkbox = page.locator('input[value="course-map"]')
  await expect(topic.locator('.stage-description')).toBeVisible()
  await expect(topic.locator('.stage-body')).toBeHidden()
  await page.getByRole('button', { name: 'Очистить выбор' }).click()
  await expect(topic.locator('.stage-description')).toBeHidden()
  await topic.locator('summary').press('Enter')
  await expect(topic.locator('.stage-body')).toBeVisible()
  await expect(topic.locator('.stage-description')).toBeVisible()
  await expect(checkbox).not.toBeChecked()
  await expect(page.getByTestId('selected-hours')).toHaveText('0 ч.')
  await checkbox.check()
  await topic.locator('summary').press('Enter')
  await expect(topic.locator('.stage-body')).toBeHidden()
  await expect(topic.locator('.stage-description')).toBeVisible()
  await expect(page.getByTestId('selected-hours')).toHaveText('2 ч.')
  await page.locator('[data-preset="visual"]').click()
  await expect(topic.locator('.stage-description')).toBeHidden()
  await expect(page.locator('.stage-row[data-selected="true"]')).toHaveCount(5)
  await expect(page.getByTestId('selected-hours')).toHaveText('18 ч.')
})
