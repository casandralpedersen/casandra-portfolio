import { test, expect } from '@playwright/test'

const HOME_URL = process.env.HOME_URL || 'http://127.0.0.1:4173/'
const modes = ['Original', 'Editorial', 'Scrapbook', 'Lab', 'Cinema']

test('home modes switch, persist and reset scroll', async ({ page }) => {
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  for (const mode of modes) {
    await page.evaluate(() => window.scrollTo(0, 1000))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

    await page.getByRole('button', { name: mode, exact: true }).click()

    await expect(page.locator('[data-home-mode]')).toHaveAttribute('data-home-mode', mode.toLowerCase())
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  }

  await page.evaluate(() => window.scrollTo(0, 1000))
  await page.reload({ waitUntil: 'networkidle' })

  await expect(page.locator('[data-home-mode]')).toHaveAttribute('data-home-mode', 'cinema')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(page.evaluate(() => localStorage.getItem('home-layout'))).resolves.toBe('cinema')
})

test('original mode preserves the current home sections', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'original'))
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  await expect(page.getByLabel('Casandra')).toBeVisible()
  await expect(page.getByText('Det hele kogt ned')).toBeVisible()
  await expect(page.getByText('Mine fingeraftryk')).toBeVisible()
  await expect(page.getByText('Nok om mig. Hvad arbejder du på?')).toBeVisible()
})

test('home restores browser scroll restoration when navigating away', async ({ page }) => {
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  await expect(page.evaluate(() => window.history.scrollRestoration)).resolves.toBe('manual')
  await page.locator('a[href="/om"]').first().click()

  await expect(page).toHaveURL(/\/om$/)
  await expect(page.evaluate(() => window.history.scrollRestoration)).resolves.toBe('auto')
})

test('home mode switcher exposes group and selected mode semantics', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'original'))
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  const switcher = page.getByRole('group', { name: 'Forside-layout' })
  await expect(switcher).toBeVisible()
  await expect(switcher.getByRole('button', { name: 'Original', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(switcher.getByRole('button', { name: 'Editorial', exact: true })).toHaveAttribute('aria-pressed', 'false')
})

test('editorial mode renders its typographic story', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'editorial'))
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  await expect(page.getByRole('heading', { name: 'Design med forretningsinstinkt' })).toBeVisible()
  await expect(page.locator('[data-editorial-word]')).toHaveCount(3)
  await expect(page.locator('[data-editorial-feature]')).toHaveCount(3)
  await expect(page.locator('[data-editorial-portrait]')).toBeVisible()
})

test('editorial shared sections expose project, about and contact links', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'editorial'))
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  const projects = page.locator('[data-shared-projects]')
  const contact = page.locator('[data-shared-contact]')

  await expect(projects.locator('a[href="/arbejde/o-bar"]')).toBeVisible()
  await expect(contact.locator('a[href="/om"]')).toBeVisible()
  await expect(contact.locator('a[href^="mailto:"]')).toBeVisible()
})

test('editorial avoids page overflow on desktop and mobile', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('home-layout', 'editorial'))

  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await page.goto(HOME_URL, { waitUntil: 'networkidle' })

    await expect(page.locator('[data-home-mode="editorial"] main')).toHaveJSProperty('scrollWidth', viewport.width)
    await page.evaluate(() => window.scrollTo(100, 0))
    await expect.poll(() => page.evaluate(() => window.scrollX)).toBe(0)
  }
})

test('editorial disables parallax and project reveals with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => localStorage.setItem('home-layout', 'editorial'))
  await page.goto(HOME_URL, { waitUntil: 'networkidle' })

  const portrait = page.locator('[data-editorial-portrait]')
  const heading = page.locator('#editorial-pillars-title')
  const heroWords = page.locator('[data-editorial-word]')
  const features = page.locator('[data-editorial-feature]')
  const projectCard = page.locator('[data-shared-project-card]').first()
  const initialTransform = await portrait.evaluate((element) => getComputedStyle(element).transform)
  const initialHeadingTransform = await heading.evaluate((element) => getComputedStyle(element).transform)

  await expect(heroWords).toHaveCount(3)
  await expect(features).toHaveCount(3)
  await expect(heroWords.first()).toHaveCSS('opacity', '1')
  await expect(heroWords.first()).toHaveCSS('transform', 'none')
  await expect(features.first()).toHaveCSS('opacity', '1')
  await expect(features.first()).toHaveCSS('transform', 'none')
  await expect(projectCard).toHaveCSS('opacity', '1')
  await expect(projectCard).toHaveCSS('transform', 'none')
  await page.evaluate(() => window.scrollTo(0, 1200))

  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).transform)).toBe(initialTransform)
  await expect.poll(() => heading.evaluate((element) => getComputedStyle(element).transform)).toBe(initialHeadingTransform)
})
