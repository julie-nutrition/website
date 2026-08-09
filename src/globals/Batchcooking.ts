import { SectionsBlocks } from '@/fields/SectionsBlocks'
import { GlobalConfig } from 'payload'

export const Batchcooking: GlobalConfig = {
  slug: 'batchcooking',
  fields: [
    SectionsBlocks,
    {
      type: 'group',
      label: 'Formules',
      fields: [
        {
          name: 'formules-title',
          type: 'text',
          label: 'Titre de la section Formules',
        },
        {
          name: 'formules-description',
          type: 'textarea',
          label: 'Description de la section Formules',
        },
        {
          name: 'formules',
          type: 'array',
          label: 'Liste des formules',
          fields: [
            {
              name: 'formule-title',
              type: 'text',
              label: 'Titre de la formule',
            },
            {
              name: 'formule-description',
              type: 'textarea',
              label: 'Description de la formule',
            },
            {
              name: 'formule-key-points',
              type: 'array',
              label: 'Points clés de la formule',
              fields: [
                {
                  name: 'key-point',
                  type: 'text',
                  label: 'Point clé',
                },
              ],
            },
            {
              name: 'formule-price',
              type: 'number',
              label: 'Prix de la formule',
            },
            {
              name: 'formule-final-price',
              type: 'number',
              label: "Prix final de la formule (apres crédit d'impôt)",
            },
            {
              name: 'formule-link',
              type: 'text',
              label: 'Lien de la formule',
            },
            {
              name: 'formule-spotlight',
              type: 'checkbox',
              label: 'Mettre en avant la formule',
            },
          ],
        },
      ],
    },
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
