import { Pages } from '@/collections/Pages'
import { SectionsBlocks } from '@/fields/SectionsBlocks'
import { Homepage } from '@/globals/Homepage'
import type { Page, User } from '@/payload-types'
import { ValidationError } from 'payload'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const release = vi.hoisted(() => ({ NUTRITION_ENABLED: false }))
vi.mock('@/config/release', () => release)

beforeEach(() => {
  release.NUTRITION_ENABLED = false
})

const user: User & { collection: 'users' } = {
  id: 1,
  email: 'editor@example.com',
  collection: 'users',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

const page: Page = {
  id: 1,
  slug: 'nutrition',
  sections: [],
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
}

describe('Pages collection', () => {
  it('uses a required unique identity limited to the two existing routes', () => {
    expect(Pages.slug).toBe('pages')
    expect(Pages.dbName).toBe('pages')
    expect(Pages.timestamps).toBe(true)
    const identity = Pages.fields[0]
    expect(identity).toMatchObject({ name: 'slug', type: 'select', required: true, unique: true })
    if (identity.type !== 'select') throw new Error('Expected a select identity')
    expect(identity.hasMany).not.toBe(true)
    expect(identity.options).toEqual([
      { label: 'Nutrition', value: 'nutrition' },
      { label: 'Batchcooking', value: 'batchcooking' },
    ])
    expect(Pages.fields[1]).toBe(SectionsBlocks)
  })

  it('limits anonymous launch reads to Batchcooking', () => {
    expect(Pages.access.read({ req: { user: null } })).toEqual({
      slug: { equals: 'batchcooking' },
    })
  })

  it('keeps both Pages readable for authenticated editors during launch', () => {
    expect(Pages.access.read({ req: { user } })).toBe(true)
  })

  it('restores anonymous reads of both Pages when Nutrition is released', () => {
    release.NUTRITION_ENABLED = true
    expect(Pages.access.read({ req: { user: null } })).toBe(true)
  })

  describe('Homepage Nutrition teaser access', () => {
    const fields = Homepage.fields[0].tabs[1].fields

    it('allows public Homepage reads so field access can filter the teaser', () => {
      expect(Homepage.access.read()).toBe(true)
    })

    it('preserves all three Nutrition fields with matching read access', () => {
      expect(fields.map((field) => field.name)).toEqual([
        'nutrition-image',
        'nutrition-title',
        'nutrition-description',
      ])
      for (const field of fields) {
        if (!('access' in field) || !field.access?.read) {
          throw new Error(`Missing read access for ${field.name}`)
        }
        const read = field.access.read
        expect(read({ req: { user: null } })).toBe(false)
        expect(read({ req: { user } })).toBe(true)
        release.NUTRITION_ENABLED = true
        expect(read({ req: { user: null } })).toBe(true)
        release.NUTRITION_ENABLED = false
      }
    })

    it('does not restrict the Batchcooking teaser fields', () => {
      for (const field of Homepage.fields[0].tabs[0].fields) {
        expect('access' in field ? field.access : undefined).toBeUndefined()
      }
    })
  })

  it.each(['create', 'update', 'delete'] as const)(
    'requires authentication for %s',
    (operation) => {
      expect(Pages.access[operation]({ req: { user: null } })).toBe(false)
      expect(Pages.access[operation]({ req: { user } })).toBe(true)
    },
  )

  const beforeChange = Pages.hooks.beforeChange[0]

  it.each(['nutrition', 'batchcooking'] as const)('allows creation of %s', (slug) => {
    const data = { slug }
    expect(beforeChange({ data, operation: 'create' })).toBe(data)
  })

  it.each([
    { from: 'nutrition', to: 'batchcooking' },
    { from: 'batchcooking', to: 'nutrition' },
  ] as const)('rejects server-side identity changes from $from to $to', ({ from, to }) => {
    expect(() =>
      beforeChange({
        data: { slug: to },
        operation: 'update',
        originalDoc: { ...page, slug: from },
      }),
    ).toThrow(ValidationError)
  })

  it('allows section edits with the same or omitted identity', () => {
    for (const data of [{ sections: [] }, { slug: page.slug, sections: [] }]) {
      expect(beforeChange({ data, operation: 'update', originalDoc: page })).toBe(data)
    }
  })
})
