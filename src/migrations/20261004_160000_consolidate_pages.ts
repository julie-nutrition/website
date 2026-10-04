import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'
import { executePagesMigration } from './helpers/pages-data'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await executePagesMigration((statement) => db.execute(sql.raw(statement)), 'up')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await executePagesMigration((statement) => db.execute(sql.raw(statement)), 'down')
}
