import { createGlobals, createPages, dropGlobals, dropPages } from './pages-schema'

type Execute = (statement: string) => Promise<unknown>
type Table = { suffix: string; columns: string[]; parent?: string }

const pageSlugs = ['batchcooking', 'nutrition'] as const
const sectionColumns = ['_order', '_parent_id', '_path', 'id', 'section_id']
const tables: Table[] = [
  {
    suffix: 'blocks_hero_section',
    columns: [...sectionColumns, 'header', 'description', 'image_id', 'block_name'],
  },
  {
    suffix: 'blocks_hero_section_tags',
    parent: 'blocks_hero_section',
    columns: ['_order', '_parent_id', 'id', 'label', 'icon'],
  },
  {
    suffix: 'blocks_hero_section_actions',
    parent: 'blocks_hero_section',
    columns: ['_order', '_parent_id', 'id', 'label', 'href'],
  },
  {
    suffix: 'blocks_overview_section',
    columns: [
      ...sectionColumns,
      'meta_title',
      'header',
      'description',
      'theme',
      'layout',
      'block_name',
    ],
  },
  {
    suffix: 'blocks_issues_section',
    columns: [...sectionColumns, 'header', 'solution_title', 'solution_content', 'block_name'],
  },
  {
    suffix: 'blocks_issues_section_issues',
    parent: 'blocks_issues_section',
    columns: ['_order', '_parent_id', 'id', 'icon', 'issue', 'description'],
  },
  {
    suffix: 'blocks_stepper_section',
    columns: [...sectionColumns, 'meta_title', 'header', 'description', 'block_name'],
  },
  {
    suffix: 'blocks_stepper_section_steps',
    parent: 'blocks_stepper_section',
    columns: ['_order', '_parent_id', 'id', 'title', 'icon', 'description'],
  },
  {
    suffix: 'blocks_pricing_section',
    columns: [...sectionColumns, 'meta_title', 'header', 'description', 'footer', 'block_name'],
  },
  {
    suffix: 'blocks_pricing_section_plans',
    parent: 'blocks_pricing_section',
    columns: [
      '_order',
      '_parent_id',
      'id',
      'recommended',
      'title',
      'description',
      'footer',
      'price',
      'final_price',
      'final_price_unit',
      'cta',
      'link',
    ],
  },
  {
    suffix: 'blocks_pricing_section_plans_key_points',
    parent: 'blocks_pricing_section_plans',
    columns: ['_order', '_parent_id', 'id', 'key_point'],
  },
  {
    suffix: 'blocks_info_section',
    columns: [...sectionColumns, 'meta_title', 'header', 'description', 'media_id', 'block_name'],
  },
  {
    suffix: 'blocks_testimonial_section',
    columns: [...sectionColumns, 'meta_title', 'header', 'block_name'],
  },
  {
    suffix: 'blocks_testimonial_section_testimonials',
    parent: 'blocks_testimonial_section',
    columns: ['_order', '_parent_id', 'id', 'name', 'service', 'content'],
  },
  {
    suffix: 'rels',
    columns: ['order', 'parent_id', 'path', 'media_id'],
  },
]

function pageRows(table: Table, slug: string): string {
  let joins = ''
  let current = table
  let alias = 'source'
  let depth = 0
  while (current.parent) {
    const parent = tables.find((entry) => entry.suffix === current.parent)
    if (!parent) throw new Error(`Missing migration parent for ${current.suffix}`)
    const parentAlias = `ancestor${++depth}`
    joins += ` JOIN "pages_${parent.suffix}" ${parentAlias} ON ${alias}."_parent_id" = ${parentAlias}."id"`
    current = parent
    alias = parentAlias
  }
  const parentColumn = current.suffix === 'rels' ? 'parent_id' : '_parent_id'
  return `"pages_${table.suffix}" source${joins}
    JOIN "pages" page ON ${alias}."${parentColumn}" = page."id"
    WHERE page."slug" = '${slug}'`
}

function copiedColumns(table: Table, slug: string, direction: 'up' | 'down'): string {
  return table.columns
    .map((column) => {
      const value = `source."${column}"`
      if (column === 'parent_id' || (column === '_parent_id' && !table.parent)) {
        return direction === 'up' ? `(SELECT "id" FROM "pages" WHERE "slug" = '${slug}')` : '1'
      }
      if (column === 'id' || (column === '_parent_id' && table.parent)) {
        return direction === 'up'
          ? `'${slug}:' || ${value}`
          : `CASE WHEN left(${value}, ${slug.length + 1}) = '${slug}:'
          THEN substring(${value} FROM ${slug.length + 2}) ELSE ${value} END`
      }
      if (column === 'theme' || column === 'layout') {
        const target = direction === 'up' ? 'pages' : slug
        return `${value}::text::"enum_${target}_blocks_overview_section_${column}"`
      }
      return value
    })
    .join(', ')
}

function verifyCopy(expected: string, actual: string, label: string): string {
  return `DO $$ BEGIN
    IF EXISTS ((${expected} EXCEPT ALL ${actual}) UNION ALL (${actual} EXCEPT ALL ${expected})) THEN
      RAISE EXCEPTION 'Pages migration verification failed: ${label}';
    END IF;
  END $$;`
}

export async function executePagesMigration(
  execute: Execute,
  direction: 'up' | 'down',
): Promise<void> {
  const up = direction === 'up'
  const locks = up
    ? pageSlugs.flatMap((slug) => [slug, ...tables.map((table) => `${slug}_${table.suffix}`)])
    : ['pages', ...tables.map((table) => `pages_${table.suffix}`)]
  await execute(
    `LOCK TABLE ${locks.map((name) => `"${name}"`).join(', ')} IN ACCESS EXCLUSIVE MODE;`,
  )

  if (up) {
    for (const slug of pageSlugs) {
      await execute(
        `DO $$ BEGIN
        IF (SELECT count(*) FROM "${slug}") > 1 THEN
          RAISE EXCEPTION 'Expected at most one ${slug} global';
        END IF;
      END $$;`,
      )
    }
  }

  for (const statement of up ? createPages : createGlobals) await execute(statement)

  for (const slug of pageSlugs) {
    const timestamps = up
      ? `COALESCE((SELECT "updated_at" FROM "${slug}"), now()),
         COALESCE((SELECT "created_at" FROM "${slug}"), now())`
      : '"updated_at", "created_at"'
    const expectedPage = up
      ? `SELECT '${slug}'::text AS identity, ${timestamps}`
      : `SELECT 1 AS identity, ${timestamps} FROM "pages" WHERE "slug" = '${slug}'`
    const target = up ? 'pages' : slug
    const identity = up ? 'slug' : 'id'
    const insertPage = up ? `SELECT '${slug}'::"enum_pages_slug", ${timestamps}` : expectedPage
    await execute(
      `INSERT INTO "${target}" ("${identity}", "updated_at", "created_at") ${insertPage};`,
    )
    const actualPage = `SELECT "${identity}"${up ? '::text' : ''} AS identity, "updated_at", "created_at"
      FROM "${target}"${up ? ` WHERE "slug" = '${slug}'` : ''}`
    await execute(verifyCopy(expectedPage, actualPage, slug))

    for (const table of tables) {
      const columns = table.columns.map((column) => `"${column}"`).join(', ')
      const expected = `SELECT ${copiedColumns(table, slug, direction)} FROM ${
        up ? `"${slug}_${table.suffix}" source` : pageRows(table, slug)
      }`
      const targetTable = `${up ? 'pages' : slug}_${table.suffix}`
      await execute(`INSERT INTO "${targetTable}" (${columns}) ${expected};`)
      const actual = `SELECT ${table.columns.map((column) => `source."${column}"`).join(', ')}
        FROM ${up ? pageRows(table, slug) : `"${targetTable}" source`}`
      await execute(verifyCopy(expected, actual, `${slug}_${table.suffix}`))
    }
  }

  if (up) {
    await execute(
      `DELETE FROM "payload_locked_documents" WHERE "global_slug" IN ('batchcooking', 'nutrition');`,
    )
  } else {
    await execute(
      `DELETE FROM "payload_locked_documents"
      WHERE "id" IN (SELECT "parent_id" FROM "payload_locked_documents_rels" WHERE "pages_id" IS NOT NULL);`,
    )
  }
  for (const statement of up ? dropGlobals : dropPages) await execute(statement)
}
