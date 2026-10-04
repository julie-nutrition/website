import { PGlite } from '@electric-sql/pglite'
import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { executePagesMigration } from '../../src/migrations/helpers/pages-data'

type Column = { type: string; primaryKey: boolean; notNull: boolean; default?: string }
type ForeignKey = {
  name: string
  columnsFrom: string[]
  columnsTo: string[]
  tableTo: string
  onDelete: string
}
type Table = {
  name: string
  columns: Record<string, Column>
  foreignKeys: Record<string, ForeignKey>
}
type Snapshot = {
  tables: Record<string, Table>
  enums: Record<string, { name: string; values: string[] }>
}

const snapshot: Snapshot = JSON.parse(
  readFileSync('src/migrations/20261003_143549_add_media_object_key.json', 'utf8'),
)
const slugs = ['batchcooking', 'nutrition'] as const
const quote = (name: string) => `"${name.replaceAll('"', '""')}"`
const literal = (value: string) => `'${value.replaceAll("'", "''")}'`
let db: PGlite

async function createLegacySchema() {
  for (const entry of Object.values(snapshot.enums)) {
    await db.exec(
      `CREATE TYPE ${quote(entry.name)} AS ENUM (${entry.values.map(literal).join(', ')});`,
    )
  }
  for (const table of Object.values(snapshot.tables)) {
    const columns = Object.entries(table.columns).map(([name, column]) => {
      const type = snapshot.enums[`public.${column.type}`] ? quote(column.type) : column.type
      return `${quote(name)} ${type}${column.primaryKey ? ' PRIMARY KEY' : ''}${column.notNull ? ' NOT NULL' : ''}${column.default !== undefined ? ` DEFAULT ${column.default}` : ''}`
    })
    await db.exec(`CREATE TABLE ${quote(table.name)} (${columns.join(', ')});`)
  }
  for (const table of Object.values(snapshot.tables)) {
    for (const key of Object.values(table.foreignKeys)) {
      await db.exec(`ALTER TABLE ${quote(table.name)} ADD CONSTRAINT ${quote(key.name)}
        FOREIGN KEY (${key.columnsFrom.map(quote).join(', ')})
        REFERENCES ${quote(key.tableTo)} (${key.columnsTo.map(quote).join(', ')}) ON DELETE ${key.onDelete};`)
    }
  }
}

function fixtureValue(table: Table, column: string, definition: Column, slug: string): string {
  if (column === 'id') return literal(table.name.replace(`${slug}_`, ''))
  if (column === '_parent_id' || column === 'parent_id') {
    const key = Object.values(table.foreignKeys).find((entry) => entry.columnsFrom.includes(column))
    if (!key) throw new Error(`Missing fixture parent for ${table.name}.${column}`)
    return key.tableTo === slug ? '1' : literal(key.tableTo.replace(`${slug}_`, ''))
  }
  if (column === '_order' || column === 'order') return '3'
  if (column.endsWith('media_id') || column === 'image_id') return '7'
  if (column === '_path') return "'sections'"
  if (column === 'final_price_unit') return "'/week'"
  if (column === 'solution_content' && slug === 'nutrition') return 'NULL'
  const enumeration = snapshot.enums[`public.${definition.type}`]
  if (enumeration)
    return literal(enumeration.values[slug === 'nutrition' ? enumeration.values.length - 1 : 0])
  if (definition.type === 'boolean') return 'true'
  if (definition.type === 'jsonb')
    return `${literal(JSON.stringify({ content: `${slug} 'rich' content` }))}::jsonb`
  if (/numeric|integer/.test(definition.type)) return '42'
  return literal(`${slug} ${column}`)
}

async function seedGlobals() {
  await db.exec(`INSERT INTO "media" ("id", "alt") VALUES (7, 'Migration fixture');`)
  for (const slug of slugs) {
    await db.exec(`INSERT INTO "${slug}" ("id", "created_at", "updated_at")
      VALUES (1, '2025-01-01T10:00:00Z', '2026-01-01T10:00:00Z');`)
    const pending = Object.values(snapshot.tables).filter((table) =>
      table.name.startsWith(`${slug}_`),
    )
    const seeded = new Set([slug, 'media'])
    while (pending.length) {
      const index = pending.findIndex((table) =>
        Object.values(table.foreignKeys).every((key) => seeded.has(key.tableTo)),
      )
      if (index < 0) throw new Error(`Cannot order fixture tables for ${slug}`)
      const [table] = pending.splice(index, 1)
      const columns = Object.entries(table.columns).filter(([, column]) => column.type !== 'serial')
      await db.exec(`INSERT INTO "${table.name}" (${columns.map(([name]) => quote(name)).join(', ')})
        VALUES (${columns.map(([name, column]) => fixtureValue(table, name, column, slug)).join(', ')});`)
      seeded.add(table.name)
    }
  }
}

async function migrate(direction: 'up' | 'down') {
  await db.transaction(async (transaction) => {
    await executePagesMigration((statement) => transaction.exec(statement), direction)
  })
}

async function legacyContent() {
  const contents: Record<string, unknown[]> = {}
  for (const table of Object.values(snapshot.tables)) {
    if (!slugs.some((slug) => table.name === slug || table.name.startsWith(`${slug}_`))) continue
    const columns = Object.keys(table.columns).filter((name) =>
      table.name.endsWith('_rels') ? name !== 'id' : true,
    )
    contents[table.name] = (
      await db.query(`SELECT ${columns.map(quote).join(', ')} FROM "${table.name}" ORDER BY 1`)
    ).rows
  }
  return contents
}

beforeEach(async () => {
  db = new PGlite()
  await createLegacySchema()
})

afterEach(async () => {
  await db.close()
})

describe('consolidating page globals', () => {
  it('preserves both complete pages, colliding nested IDs and media relationships, and can roll back', async () => {
    await seedGlobals()
    const before = await legacyContent()
    await migrate('up')
    expect((await db.query('SELECT slug::text FROM pages ORDER BY slug::text')).rows).toEqual([
      { slug: 'batchcooking' },
      { slug: 'nutrition' },
    ])
    expect(
      (await db.query('SELECT final_price_unit FROM pages_blocks_pricing_section_plans')).rows,
    ).toEqual([{ final_price_unit: '/week' }, { final_price_unit: '/week' }])
    expect((await db.query('SELECT media_id FROM pages_rels')).rows).toEqual([
      { media_id: 7 },
      { media_id: 7 },
    ])
    expect(
      (
        await db.query(
          "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND (table_name LIKE 'nutrition%' OR table_name LIKE 'batchcooking%')",
        )
      ).rows,
    ).toEqual([])
    expect(
      (
        await db.query(
          "SELECT count(*)::integer AS count FROM information_schema.tables WHERE table_schema = 'public' AND (table_name = 'pages' OR table_name LIKE 'pages\\_%' ESCAPE '\\')",
        )
      ).rows,
    ).toEqual([{ count: 16 }])
    expect((await db.query('SELECT reset_password_requested_at FROM users')).rows).toEqual([])
    await migrate('down')
    expect(await legacyContent()).toEqual(before)
    expect((await db.query("SELECT to_regclass('public.pages') AS pages")).rows).toEqual([
      { pages: null },
    ])
  }, 30_000)

  it('creates valid empty pages when the globals have never been saved', async () => {
    await migrate('up')
    expect((await db.query('SELECT count(*)::integer AS count FROM pages')).rows).toEqual([
      { count: 2 },
    ])
    expect(
      (await db.query('SELECT count(*)::integer AS count FROM pages_blocks_testimonial_section'))
        .rows,
    ).toEqual([{ count: 0 }])
  }, 30_000)

  it('enforces the two unique identities and cascades deletion only within the deleted page', async () => {
    await seedGlobals()
    await migrate('up')
    await expect(db.exec("INSERT INTO pages (slug) VALUES ('nutrition');")).rejects.toThrow(
      'duplicate key',
    )
    await expect(db.exec("INSERT INTO pages (slug) VALUES ('other');")).rejects.toThrow(
      'invalid input value for enum',
    )
    await db.exec("DELETE FROM pages WHERE slug = 'nutrition';")
    expect((await db.query('SELECT slug FROM pages')).rows).toEqual([{ slug: 'batchcooking' }])
    expect(
      (await db.query('SELECT id FROM pages_blocks_testimonial_section_testimonials')).rows,
    ).toEqual([{ id: 'batchcooking:blocks_testimonial_section_testimonials' }])
    expect((await db.query('SELECT count(*)::integer AS count FROM media')).rows).toEqual([
      { count: 1 },
    ])
  }, 30_000)

  it('rolls back edited content, new nested records and a deleted page without resurrecting it', async () => {
    await seedGlobals()
    await migrate('up')
    await db.exec(`UPDATE pages_blocks_testimonial_section_testimonials SET content = 'Edited';
      INSERT INTO pages_blocks_testimonial_section_testimonials (_order, _parent_id, id, name, content)
      SELECT 4, id, 'new-testimonial', 'New testimonial', 'New content'
      FROM pages_blocks_testimonial_section WHERE id = 'batchcooking:blocks_testimonial_section';
      DELETE FROM pages WHERE slug = 'nutrition';`)
    await migrate('down')
    expect(
      (
        await db.query(
          'SELECT id, content FROM batchcooking_blocks_testimonial_section_testimonials ORDER BY id',
        )
      ).rows,
    ).toEqual([
      { id: 'blocks_testimonial_section_testimonials', content: 'Edited' },
      { id: 'new-testimonial', content: 'New content' },
    ])
    expect((await db.query('SELECT count(*)::integer AS count FROM nutrition')).rows).toEqual([
      { count: 0 },
    ])
    expect(
      (
        await db.query(
          'SELECT count(*)::integer AS count FROM nutrition_blocks_testimonial_section_testimonials',
        )
      ).rows,
    ).toEqual([{ count: 0 }])
  }, 30_000)

  it('aborts without schema or content loss when a global unexpectedly has multiple records', async () => {
    await seedGlobals()
    await db.exec('INSERT INTO nutrition (id) VALUES (2);')
    const before = await legacyContent()
    await expect(migrate('up')).rejects.toThrow('Expected at most one nutrition global')
    expect(await legacyContent()).toEqual(before)
    expect((await db.query("SELECT to_regclass('public.pages') AS pages")).rows).toEqual([
      { pages: null },
    ])
  }, 30_000)

  it('rolls back the transaction on copy verification failure', async () => {
    await seedGlobals()
    const before = await legacyContent()
    await expect(
      db.transaction(async (transaction) => {
        await executePagesMigration(async (statement) => {
          if (statement.startsWith('INSERT INTO "pages_blocks_testimonial_section_testimonials"'))
            return
          return transaction.exec(statement)
        }, 'up')
      }),
    ).rejects.toThrow('Pages migration verification failed')
    expect(await legacyContent()).toEqual(before)
    expect((await db.query("SELECT to_regclass('public.pages') AS pages")).rows).toEqual([
      { pages: null },
    ])
  }, 30_000)
})
