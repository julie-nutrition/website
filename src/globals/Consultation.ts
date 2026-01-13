import { Button } from '@/blocks/Button'
import { GlobalConfig } from 'payload'

export const Consultation: GlobalConfig = {
  slug: 'consultation',
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
      name: 'offersSection',
      type: 'group',
      label: 'Offers Section',
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
          name: 'categories',
          type: 'array',
          label: "Catégories d'offres",
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Nom de la catégorie',
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Identifiant (en minuscules, sans espaces)',
              admin: {
                description: 'Ex: student, individual, couple',
              },
            },
            {
              name: 'offers',
              type: 'array',
              label: 'Offres de cette catégorie',
              fields: [
                {
                  name: 'offer',
                  type: 'relationship',
                  relationTo: 'offer',
                  required: true,
                },
              ],
            },
          ],
          defaultValue: [
            {
              label: 'Étudiant',
              value: 'student',
              offers: [],
            },
            {
              label: 'Individuel',
              value: 'individual',
              offers: [],
            },
            {
              label: 'Couple',
              value: 'couple',
              offers: [],
            },
          ],
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
