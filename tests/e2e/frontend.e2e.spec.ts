import { expect, test } from '@playwright/test'
import { NUTRITION_ENABLED } from '../../src/config/release'

test.describe('Frontend', () => {
  test('serves the expected release entry experience', async ({ page }) => {
    await page.goto('http://localhost:3000')

    if (NUTRITION_ENABLED) {
      await expect(page).toHaveTitle('Julie BAUZA - Nutritionniste')
      await expect(page.locator('main a[href="/batchcooking"]')).toBeVisible()
      await expect(page.locator('main a[href="/nutrition"]')).toBeVisible()
    } else {
      await expect(page).toHaveURL('http://localhost:3000/batchcooking')
      await expect(page).toHaveTitle('Julie BAUZA - Batchcooking')
      await expect(page.locator('a[href="/nutrition"]')).toHaveCount(0)
      await expect(page.getByRole('link', { name: 'Prise de RDV' })).toHaveAttribute(
        'href',
        'https://cal.com/julie-nutrition',
      )
    }
  })

  test('returns a temporary homepage redirect during launch', async ({ request }) => {
    test.skip(NUTRITION_ENABLED, 'The two-offering release has a homepage instead of a redirect')
    const response = await request.get('http://localhost:3000', { maxRedirects: 0 })
    expect(response.status()).toBe(307)
    expect(response.headers().location).toBe('/batchcooking')
  })

  test('returns 404 for the hidden Nutrition route', async ({ page }) => {
    test.skip(NUTRITION_ENABLED, 'Nutrition is publicly available')
    const response = await page.goto('http://localhost:3000/nutrition')
    expect(response?.status()).toBe(404)
    await expect(page.locator('a[href="/nutrition"]')).toHaveCount(0)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  test('filters anonymous Nutrition Page and Homepage API reads during launch', async ({
    request,
  }) => {
    test.skip(NUTRITION_ENABLED, 'Nutrition is publicly readable')
    const pagesResponse = await request.get('http://localhost:3000/api/pages?limit=100')
    expect(pagesResponse.status()).toBe(200)
    const pages = await pagesResponse.json()
    expect(pages.docs.length).toBeGreaterThan(0)
    expect(pages.docs.every((doc: { slug: string }) => doc.slug === 'batchcooking')).toBe(true)

    const homepageResponse = await request.get('http://localhost:3000/api/globals/homepage')
    expect(homepageResponse.status()).toBe(200)
    const homepage = await homepageResponse.json()
    for (const field of ['nutrition-title', 'nutrition-description', 'nutrition-image']) {
      expect(homepage).not.toHaveProperty(field)
    }
  })
})
