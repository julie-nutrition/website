import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'

export const OffersSection: Block = {
  slug: 'offers-section',
  labels: {
    singular: 'Section d’offres',
    plural: 'Sections d’offres',
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
      type: 'relationship',
      name: 'offers',
      label: 'Offres',
      relationTo: 'offers',
      hasMany: true,
      required: true,
    },
    sectionStyleField,
  ],
}
