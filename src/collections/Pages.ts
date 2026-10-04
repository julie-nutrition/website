import { canReadNutrition } from '@/access/nutrition'
import { SectionsBlocks } from '@/fields/SectionsBlocks'
import type { Page } from '@/payload-types'
import {
  ValidationError,
  type Access,
  type CollectionBeforeChangeHook,
  type CollectionConfig,
  type PayloadRequest,
} from 'payload'

const authenticated = (({ req }: { req: Pick<PayloadRequest, 'user'> }) =>
  Boolean(req.user)) satisfies Access

const readPages = (({ req }: { req: Pick<PayloadRequest, 'user'> }) =>
  canReadNutrition({ req }) ? true : { slug: { equals: 'batchcooking' } }) satisfies Access

const preserveIdentity = ({
  data,
  operation,
  originalDoc,
}: Pick<Parameters<CollectionBeforeChangeHook<Page>>[0], 'data' | 'operation' | 'originalDoc'>) => {
  if (operation === 'update' && data.slug !== undefined && data.slug !== originalDoc?.slug) {
    throw new ValidationError({
      errors: [{ message: 'Page identity cannot be changed after creation.', path: 'slug' }],
    })
  }

  return data
}

export const Pages = {
  slug: 'pages',
  dbName: 'pages',
  timestamps: true,
  admin: {
    useAsTitle: 'slug',
  },
  access: {
    read: readPages,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [preserveIdentity],
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Nutrition', value: 'nutrition' },
        { label: 'Batchcooking', value: 'batchcooking' },
      ],
      admin: {
        condition: (_, __, { operation }) => operation === 'create',
        description: 'The page identity is fixed after creation.',
      },
    },
    SectionsBlocks,
  ],
} satisfies CollectionConfig
