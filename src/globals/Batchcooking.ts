import { SectionsBlocks } from '@/fields/SectionsBlocks'
import { GlobalConfig } from 'payload'

export const Batchcooking: GlobalConfig = {
  slug: 'batchcooking',
  fields: [
    SectionsBlocks,
    {
      type: 'group',
      label: 'Temoignages',
      fields: [
        {
          name: 'feedbacks-title',
          type: 'text',
          label: 'Titre de la section Témoignages',
        },
        {
          name: 'feedbacks',
          type: 'array',
          label: 'Liste des témoignages',
          fields: [
            {
              name: 'feedback-author',
              type: 'text',
              label: 'Auteur du témoignage',
            },
            {
              name: 'feedback-service-type',
              type: 'text',
              label: 'Type de service',
            },
            {
              name: 'feedback-content',
              type: 'textarea',
              label: 'Texte du témoignage',
            },
          ],
        },
      ],
    },
  ],
}
