import { SectionsBlocks } from '@/fields/SectionsBlocks'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload'

export const Batchcooking: GlobalConfig = {
  slug: 'batchcooking',
  fields: [
    SectionsBlocks,
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
    {
      type: 'group',
      label: 'Problematique',
      fields: [
        {
          name: 'issues-title',
          type: 'text',
          label: 'Titre de la section Problematique',
        },
        {
          name: 'issues',
          type: 'array',
          label: 'Liste des problématiques',
          fields: [
            {
              name: 'issue-title',
              type: 'text',
              label: 'Problématique',
            },
            {
              name: 'issue-description',
              type: 'textarea',
              label: 'Description de la problématique',
            },
            {
              name: 'issue-emoticon',
              type: 'text',
              label: 'Émoticône de la problématique',
            },
          ],
        },
        {
          name: 'solution-title',
          type: 'text',
          label: 'Titre de la section Solution',
        },
        {
          name: 'solution-description',
          type: 'textarea',
          label: 'Description de la section Solution',
        },
      ],
    },
    {
      type: 'group',
      label: 'Approche',
      fields: [
        {
          name: 'approach-title',
          type: 'text',
          label: 'Titre de la section Approche',
        },
        {
          name: 'approach-description',
          type: 'textarea',
          label: 'Description de la section Approche',
        },
        {
          name: 'approach-steps',
          type: 'array',
          label: "Liste des étapes de l'approche",
          fields: [
            {
              name: 'step-title',
              type: 'text',
              label: "Titre de l'étape",
            },
            {
              name: 'step-icon',
              type: 'text',
              label: "Émoticône de l'étape",
            },
            {
              name: 'step-description',
              type: 'textarea',
              label: "Description de l'étape",
            },
          ],
        },
      ],
    },
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
