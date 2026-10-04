import { canReadNutrition } from '@/access/nutrition'
import { GlobalConfig } from 'payload'

export const Homepage = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Batchcooking',
          fields: [
            {
              name: 'batchcooking-image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image de la section Batchcooking',
            },
            {
              name: 'batchcooking-title',
              type: 'text',
              label: 'Titre de la section Batchcooking',
            },
            {
              name: 'batchcooking-description',
              type: 'textarea',
              label: 'Description de la section Batchcooking',
            },
          ],
        },
        {
          label: 'Nutrition',
          fields: [
            {
              name: 'nutrition-image',
              access: { read: canReadNutrition },
              type: 'upload',
              relationTo: 'media',
              label: 'Image de la section Nutrition',
            },
            {
              name: 'nutrition-title',
              access: { read: canReadNutrition },
              type: 'text',
              label: 'Titre de la section Nutrition',
            },
            {
              name: 'nutrition-description',
              access: { read: canReadNutrition },
              type: 'textarea',
              label: 'Description de la section Nutrition',
            },
          ],
        },
      ],
    },
  ],
} satisfies GlobalConfig
