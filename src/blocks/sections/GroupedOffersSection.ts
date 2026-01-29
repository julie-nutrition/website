import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'

export const GroupedOffersSection: Block = {
  slug: 'grouped-offers-section',
  labels: {
    singular: 'Section d’offres groupées',
    plural: 'Sections d’offres groupées',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'textarea',
      required: false,
    },
    {
      type: 'array',
      name: 'groupedOffers',
      label: 'Groupes d’offres',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Titre du groupe',
          type: 'text',
          required: true,
        },
        {
          type: 'relationship',
          name: 'offers',
          label: 'Offres',
          relationTo: 'offers',
          hasMany: true,
          required: true,
        },
      ],
    },
    sectionStyleField,
  ],
}
