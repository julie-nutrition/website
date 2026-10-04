import { Pages } from '@/collections/Pages'
import { SectionsBlocks } from '@/fields/SectionsBlocks'
import type { Page, User } from '@/payload-types'
import { ValidationError } from 'payload'
import { describe, expect, it } from 'vitest'

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

  it('allows public reads', () => {
    expect(Pages.access.read()).toBe(true)
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
