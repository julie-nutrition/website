import { cleanup, render, screen } from '@testing-library/react'
import type { Page } from '@/payload-types'
import type { PaginatedDocs, Payload } from 'payload'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type PagePayload = {
  find: (args: Parameters<Payload['find']>[0]) => Promise<Pick<PaginatedDocs<Page>, 'docs'>>
}

const { find, getPayload, notFound } = vi.hoisted(() => ({
  find: vi.fn<PagePayload['find']>(),
  getPayload:
    vi.fn<(options: Parameters<typeof import('payload').getPayload>[0]) => Promise<PagePayload>>(),
  notFound: vi.fn<() => never>(() => {
    throw new Error('NEXT_HTTP_ERROR_FALLBACK;404')
  }),
}))

vi.mock('@/payload.config', () => ({ default: Promise.resolve({}) }))
vi.mock('payload', () => ({ getPayload }))
vi.mock('next/navigation', () => ({ notFound }))

import ContentPage from '@/app/(frontend)/pages/ContentPage'
import Nutrition from '@/app/(frontend)/nutrition/page'
import Batchcooking from '@/app/(frontend)/batchcooking/page'

const page = (slug: Page['slug'], sections?: Page['sections']): Page => ({
  id: 1,
  slug,
  sections,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
})

beforeEach(() => {
  vi.clearAllMocks()
  getPayload.mockResolvedValue({ find })
})
afterEach(cleanup)

describe('shared content page flow', () => {
  it.each([
    { slug: 'nutrition', route: Nutrition },
    { slug: 'batchcooking', route: Batchcooking },
  ] as const)('loads and renders the $slug route', async ({ slug, route }) => {
    find.mockResolvedValue({ docs: [page(slug, [{ blockType: 'info-section', header: slug }])] })
    render(await route())
    expect(screen.getByRole('heading', { name: slug })).toBeDefined()
    expect(find).toHaveBeenCalledExactlyOnceWith({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      pagination: false,
      overrideAccess: false,
    })
    expect(notFound).not.toHaveBeenCalled()
  })

  describe.each(['nutrition', 'batchcooking'] as const)('existing %s record', (slug) => {
    it.each([[], null, undefined])('renders empty pages with sections %s', async (sections) => {
      find.mockResolvedValue({ docs: [page(slug, sections)] })
      expect(await ContentPage({ slug })).toEqual([])
      expect(notFound).not.toHaveBeenCalled()
    })
  })

  it.each(['nutrition', 'batchcooking'] as const)(
    'returns notFound for missing %s',
    async (slug) => {
      find.mockResolvedValue({ docs: [] })
      await expect(ContentPage({ slug })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
      expect(notFound).toHaveBeenCalledOnce()
    },
  )

  it('preserves stored section ordering and specialized rendering', async () => {
    find.mockResolvedValue({
      docs: [
        page('batchcooking', [
          { blockType: 'info-section', id: 'first', header: 'First' },
          { blockType: 'issues-section', id: 'second', header: 'Second' },
          {
            blockType: 'pricing-section',
            id: 'third',
            header: 'Third',
            plans: [
              { id: 'plan', title: 'Plan', 'final-price': 90, 'final-price-unit': 'par atelier' },
            ],
          },
          {
            blockType: 'testimonial-section',
            id: 'fourth',
            header: 'Fourth',
            testimonials: [{ id: 'quote', name: 'Julie', content: 'A testimonial' }],
          },
        ]),
      ],
    })
    const { container } = render(await ContentPage({ slug: 'batchcooking' }))
    expect(
      Array.from(container.querySelectorAll('section h3'), (heading) => heading.textContent),
    ).toEqual(['First', 'Second', '', 'Third', 'Plan', 'Fourth'])
    expect(screen.getByText(/par atelier/)).toBeDefined()
    expect(screen.getByText(/A testimonial/).closest('.items-start')).not.toBeNull()
  })

  it('renders optional Issues rich text when configured', async () => {
    find.mockResolvedValue({
      docs: [
        page('nutrition', [
          {
            blockType: 'issues-section',
            header: 'Issues',
            'solution-content': {
              root: {
                type: 'root',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'paragraph',
                    version: 1,
                    children: [{ type: 'text', version: 1, text: 'Rich solution', format: 0 }],
                  },
                ],
              },
            },
          },
        ]),
      ],
    })
    render(await ContentPage({ slug: 'nutrition' }))
    expect(screen.getByText('Rich solution')).toBeDefined()
  })

  it('propagates unexpected data-loading errors without converting them to 404', async () => {
    find.mockRejectedValue(new Error('Database unavailable'))
    await expect(ContentPage({ slug: 'nutrition' })).rejects.toThrow('Database unavailable')
    expect(notFound).not.toHaveBeenCalled()
  })
})
