import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { HeroSection } from './blocks/HeroSection'
import { IssuesSection } from './blocks/IssuesSection'
import { Media } from './collections/Media'
import { Offer } from './collections/Offer'
import { Users } from './collections/Users'
import { Batchcooking } from './globals/Batchcooking'
import { Homepage } from './globals/Homepage'
import { Nutrition } from './globals/Nutrition'

import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { OverviewSection } from './blocks/OverviewSection'
import { StepperSection } from './blocks/StepperSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUri = process.env.DATABASE_URI
const payloadSecret = process.env.PAYLOAD_SECRET
const vercelBlobToken = process.env.BLOB_READ_WRITE_TOKEN

if (!databaseUri || !payloadSecret || !vercelBlobToken) {
  throw new Error(
    'Missing required environment variables: DATABASE_URI, PAYLOAD_SECRET, or BLOB_READ_WRITE_TOKEN',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Offer],
  globals: [Homepage, Batchcooking, Nutrition],
  blocks: [HeroSection, OverviewSection, IssuesSection, StepperSection],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  sharp,
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { fr, en },
  },
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: vercelBlobToken,
    }),
  ],
})
