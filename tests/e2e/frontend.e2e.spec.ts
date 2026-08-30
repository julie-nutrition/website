import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle('Julie BAUZA - Nutritionniste')
    await expect(page.locator('main a[href="/batchcooking"]')).toBeVisible()
    await expect(page.locator('main a[href="/nutrition"]')).toBeVisible()
  })
})
