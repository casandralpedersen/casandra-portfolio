import { test, expect } from '@playwright/test'

test('scrapbook 2.0 opens at top and shows updated labels', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('about-layout', 'scrapbook2')
  })

  await page.goto('http://127.0.0.1:4173/om', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Magasin' }).click()
  await page.evaluate(() => window.scrollTo(0, 1400))
  await page.getByRole('button', { name: 'Scrapbook 2.0' }).click()

  const scrollAfterClick = await page.evaluate(() => window.scrollY)
  expect(scrollAfterClick).toBe(0)

  await expect(page.getByText('● Design', { exact: true })).toBeVisible()
  await expect(page.getByText('● Forretning', { exact: true })).toBeVisible()
  await expect(page.getByText('● Teknologi', { exact: true })).toBeVisible()

  await page.evaluate(() => window.scrollTo(0, 1200))
  await page.reload({ waitUntil: 'networkidle' })

  const scrollY = await page.evaluate(() => window.scrollY)
  expect(scrollY).toBe(0)
})
