import { cleanup, render, screen, waitFor } from '@testing-library/react'
import type { HeroSection as HeroSectionType, Media } from '@/payload-types'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import SectionRenderer from '@/app/(frontend)/components/sections/SectionRenderer'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'

const hero = (fields: Partial<HeroSectionType> = {}): HeroSectionType => ({
  blockType: 'hero-section',
  header: 'Hero heading',
  ...fields,
})

const media = (fields: Partial<Media> = {}): Media => ({
  id: 1,
  alt: 'Hero portrait',
  url: '/hero.jpg',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  ...fields,
})

afterEach(cleanup)

describe.each([
  { name: 'Hero module', Module: HeroSection },
  { name: 'section dispatch', Module: SectionRenderer },
])('$name renders raw Hero block data', ({ Module }) => {
  it.each([undefined, null, ''])('omits the entire block when the header is %s', (header) => {
    const { container } = render(createElement(Module, { section: hero({ header }) }))
    expect(container.innerHTML).toBe('')
  })

  it('renders the heading and section identity', () => {
    render(createElement(Module, { section: hero({ 'section-id': 'intro' }) }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Hero heading')
    expect(screen.getByRole('heading').closest('section')?.id).toBe('intro')
  })

  it.each([undefined, null])('omits an absent section identity (%s)', (sectionId) => {
    const { container } = render(
      createElement(Module, { section: hero({ 'section-id': sectionId }) }),
    )
    expect(container.querySelector('section')?.hasAttribute('id')).toBe(false)
  })

  it.each([undefined, null, []])('renders safely with optional arrays %s', (items) => {
    const { container } = render(
      createElement(Module, { section: hero({ tags: items, actions: items }) }),
    )
    expect(screen.getByRole('heading').textContent).toBe('Hero heading')
    expect(screen.queryAllByRole('link')).toHaveLength(0)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('renders tags with a configured icon and optional icon values', async () => {
    render(
      createElement(Module, {
        section: hero({
          tags: [
            { label: 'With icon', icon: 'apple' },
            { label: 'Without icon' },
            { label: 'Null icon', icon: null },
            { label: 'Empty icon', icon: '' },
          ],
        }),
      }),
    )
    await waitFor(() => expect(screen.getByText('With icon').querySelector('svg')).not.toBeNull())
    for (const label of ['Without icon', 'Null icon', 'Empty icon']) {
      expect(screen.getByText(label).querySelector('svg')).toBeNull()
    }
  })

  it('preserves action order, destinations and first-action emphasis', () => {
    render(
      createElement(Module, {
        section: hero({
          actions: [
            { label: 'Primary action', href: '/nutrition' },
            { label: 'Secondary action', href: '/batchcooking' },
          ],
        }),
      }),
    )
    const links = screen.getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual(['Primary action', 'Secondary action'])
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/nutrition', '/batchcooking'])
    expect(links[0].classList.contains('bg-background-light')).toBe(true)
    expect(links[1].classList.contains('border')).toBe(true)
  })

  it('renders rich text content', () => {
    render(
      createElement(Module, {
        section: hero({
          description: {
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
                  children: [{ type: 'text', version: 1, text: 'Hero description', format: 0 }],
                },
              ],
            },
          },
        }),
      }),
    )
    expect(screen.getByText('Hero description')).toBeDefined()
  })

  it.each([undefined, null, 1, media({ url: undefined }), media({ url: null })])(
    'omits missing, unresolved or unusable images (%s)',
    (image) => {
      render(createElement(Module, { section: hero({ image }) }))
      expect(screen.queryAllByRole('img')).toHaveLength(0)
    },
  )

  it.each(['Hero portrait', ''])('renders populated media with alt text "%s"', (alt) => {
    render(createElement(Module, { section: hero({ image: media({ alt }) }) }))
    const image = screen.getByAltText(alt)
    expect(image.getAttribute('src')).toContain(encodeURIComponent('/hero.jpg'))
    expect(image.getAttribute('sizes')).toBe('(max-width: 768px) 100vw, 33vw')
    expect(image.classList.contains('object-cover')).toBe(true)
  })
})

it('keeps HTML attributes and custom classes at the Hero rendering interface', () => {
  const { container } = render(
    createElement(HeroSection, {
      section: hero({ 'section-id': 'stored-id' }),
      id: 'override-id',
      className: 'custom-class',
      'aria-label': 'Introduction',
    }),
  )
  const section = container.querySelector('section')
  expect(section?.id).toBe('override-id')
  expect(section?.classList.contains('custom-class')).toBe(true)
  expect(section?.classList.contains('bg-background-dark')).toBe(true)
  expect(section?.getAttribute('aria-label')).toBe('Introduction')
})
