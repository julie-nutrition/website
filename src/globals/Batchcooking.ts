import { Button } from '@/blocks/Button'
import { GlobalConfig } from 'payload'

export const Batchcooking: GlobalConfig = {
  slug: 'batchcooking',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'contentSection',
      type: 'group',
      label: 'Section contenu',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Caractéristiques',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icône',
              admin: {
                description: 'Nom de l\'icône lucide-react',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'offerSection',
      type: 'group',
      label: 'Section offre',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'offer',
          type: 'relationship',
          relationTo: 'offer',
          label: 'Offre associée',
          admin: {
            description: 'L\'offre de batchcooking à afficher',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
        },
        {
          type: 'blocks',
          name: 'button',
          maxRows: 1,
          blocks: [Button],
        },
      ],
    },
  ],
}
