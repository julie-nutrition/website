import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'

export const InformationSection: Block = {
  slug: 'information-section',
  labels: {
    singular: 'Section d’information',
    plural: 'Sections d’information',
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
    sectionStyleField,
  ],
}
