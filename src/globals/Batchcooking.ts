import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload'

export const Batchcooking: GlobalConfig = {
  slug: 'batchcooking',
  fields: [
    {
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'hero-image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image de la section Hero',
        },
        {
          name: 'hero-title',
          type: 'text',
          label: 'Titre de la section Hero',
        },
        {
          name: 'hero-description',
          type: 'textarea',
          label: 'Description de la section Hero',
        },
      ],
    },
    {
      type: 'group',
      label: 'Principe',
      fields: [
        {
          name: 'principe-image-1',
          type: 'upload',
          relationTo: 'media',
          label: 'Image de la section Principe - 1',
        },
        {
          name: 'principe-image-2',
          type: 'upload',
          relationTo: 'media',
          label: 'Image de la section Principe - 2',
        },
        {
          name: 'principe-image-3',
          type: 'upload',
          relationTo: 'media',
          label: 'Image de la section Principe - 3',
        },
        {
          name: 'principe-title',
          type: 'text',
          label: 'Titre de la section Principe',
        },
        {
          name: 'principe-description',
          type: 'richText',
          label: 'Description de la section Principe',
          editor: lexicalEditor(),
        },
      ],
    },
  ],
}
