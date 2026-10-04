import { cleanup, render, screen } from '@testing-library/react'
import type { Homepage } from '@/payload-types'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { release, findGlobal, getPayload, redirect } = vi.hoisted(() => ({
  release: { NUTRITION_ENABLED: false },
  findGlobal: vi.fn<() => Promise<Homepage>>(),
  getPayload: vi.fn(),
  redirect: vi.fn<(path: string) => never>((path) => {
    throw new Error(`NEXT_REDIRECT;${path}`)
  }),
}))

vi.mock('@/config/release', () => release)
vi.mock('@/payload.config', () => ({ default: Promise.resolve({}) }))
vi.mock('payload', () => ({ getPayload }))
vi.mock('next/navigation', () => ({
  redirect,
  usePathname: () => '/batchcooking',
}))
vi.mock('next/font/google', () => ({
  Open_Sans: () => ({ className: 'open-sans' }),
}))
vi.mock('next/font/local', () => ({
  default: () => ({ className: 'margin' }),
}))

const media = {
  id: 1,
  alt: 'Julie',
  url: '/julie.jpg',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

const homepage: Homepage = {
  id: 1,
  'nutrition-title': 'Nutrition',
  'nutrition-description': 'Nutrition description',
  'nutrition-image': media,
  'batchcooking-title': 'Batchcooking',
  'batchcooking-description': 'Batchcooking description',
  'batchcooking-image': media,
}

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
  release.NUTRITION_ENABLED = false
  getPayload.mockResolvedValue({ findGlobal })
  findGlobal.mockResolvedValue(homepage)
})
afterEach(cleanup)

describe('release entry experience', () => {
  it('temporarily redirects the launch homepage before loading CMS content', async () => {
    const { default: Page } = await import('@/app/(frontend)/page')
    await expect(Page()).rejects.toThrow('NEXT_REDIRECT;/batchcooking')
    expect(redirect).toHaveBeenCalledExactlyOnceWith('/batchcooking')
    expect(getPayload).not.toHaveBeenCalled()
  })

  it('restores both homepage cards and respects public CMS access when enabled', async () => {
    release.NUTRITION_ENABLED = true
    const { default: Page } = await import('@/app/(frontend)/page')
    const { container } = render(await Page())
    expect(container.querySelector('a[href="/nutrition"]')).not.toBeNull()
    expect(container.querySelector('a[href="/batchcooking"]')).not.toBeNull()
    expect(findGlobal).toHaveBeenCalledExactlyOnceWith({
      slug: 'homepage',
      overrideAccess: false,
    })
    expect(redirect).not.toHaveBeenCalled()
  })

  it.each([false, true])('gates header navigation with Nutrition enabled=%s', async (enabled) => {
    release.NUTRITION_ENABLED = enabled
    const { default: Header } = await import('@/app/(frontend)/components/Header')
    const { container } = render(createElement(Header))
    expect(container.querySelector('a[href="/nutrition"]') !== null).toBe(enabled)
    expect(container.querySelector('a[href="/batchcooking"]')).not.toBeNull()
    expect(container.querySelector('a[href="/"]')).not.toBeNull()
  })

  it('preserves email, Instagram, and Batchcooking booking links', async () => {
    const { default: Footer } = await import('@/app/(frontend)/components/Footer')
    render(createElement(Footer))
    expect(screen.getByRole('link', { name: 'Email' }).getAttribute('href')).toBe(
      'mailto:contact@julie-nutrition.fr',
    )
    expect(screen.getByRole('link', { name: 'Instagram' }).getAttribute('href')).toBe(
      'https://instagram.com/julie.batchcooking',
    )
    expect(screen.getByRole('link', { name: 'Prise de RDV' }).getAttribute('href')).toBe(
      'https://cal.com/julie-nutrition',
    )
  })
})

describe.each([false, true])('metadata with Nutrition enabled=%s', (enabled) => {
  it('uses matching homepage and site positioning', async () => {
    release.NUTRITION_ENABLED = enabled
    const [{ metadata: home }, { metadata: site }] = await Promise.all([
      import('@/app/(frontend)/page'),
      import('@/app/(frontend)/layout'),
    ])
    const title = enabled ? 'Julie BAUZA - Nutritionniste' : 'Julie BAUZA - Batchcooking'
    expect(home.title).toBe(title)
    expect(site.title).toBe(title)
    expect(home.description).toBe(
      enabled
        ? "Page d'accueil du site de Julie BAUZA, nutritionniste"
        : 'Découvrez le batchcooking à domicile avec Julie BAUZA.',
    )
    expect(site.description).toBe(
      enabled
        ? 'Découvrez les services de Julie BAUZA, nutritionniste. Consultations en ligne personnalisées et cuisine à domicile pour optimiser votre santé et bien-être.'
        : 'Découvrez le batchcooking avec Julie BAUZA : cuisine à domicile pour des repas équilibrés et savoureux.',
    )
  })
})
