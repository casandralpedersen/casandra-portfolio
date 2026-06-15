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
