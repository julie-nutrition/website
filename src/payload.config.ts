import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'

import { FeatureSection } from './blocks/sections/FeatureSection'
import { HeroSection } from './blocks/sections/HeroSection'
import { Media } from './collections/Media'
import { Offer } from './collections/Offer'
import { Page } from './collections/Page'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
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
  collections: [Users, Media, Page, Offer],
  globals: [Header, Footer],
  blocks: [HeroSection, FeatureSection],
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
