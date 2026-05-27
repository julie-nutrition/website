import { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
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
              type: 'upload',
              relationTo: 'media',
              label: 'Image de la section Nutrition',
            },
            {
              name: 'nutrition-title',
              type: 'text',
              label: 'Titre de la section Nutrition',
            },
            {
              name: 'nutrition-description',
              type: 'textarea',
              label: 'Description de la section Nutrition',
            },
          ],
        },
      ],
    },
  ],
}
