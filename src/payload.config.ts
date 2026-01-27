import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'

import { Media } from './collections/Media'
import { Offer } from './collections/Offer'
import { Users } from './collections/Users'
import { Batchcooking } from './globals/Batchcooking'
import { Consultation } from './globals/Consultation'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Homepage } from './globals/Homepage'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUri = process.env.DATABASE_URI
const payloadSecret = process.env.PAYLOAD_SECRET
const uploadthingToken = process.env.UPLOADTHING_TOKEN

if (!databaseUri || !payloadSecret || !uploadthingToken) {
  throw new Error(
    'Missing required environment variables: DATABASE_URI, PAYLOAD_SECRET, or UPLOADTHING_TOKEN',
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
  globals: [Homepage, Header, Footer, Consultation, Batchcooking],
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
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: uploadthingToken,
        acl: 'public-read',
      },
    }),
  ],
})
