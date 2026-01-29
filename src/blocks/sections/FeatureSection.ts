import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'

export const FeatureSection: Block = {
  slug: 'feature-section',
  labels: {
    singular: 'Section de fonctionnalités',
    plural: 'Sections de fonctionnalités',
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
      name: 'textAlign',
      label: 'Alignement du texte',
      type: 'radio',
      options: [
        {
          label: 'Gauche',
          value: 'left',
        },
        {
          label: 'Centre',
          value: 'center',
        },
      ],
    },
    {
      name: 'features',
      label: 'Fonctionnalités',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          label: 'Icône',
          type: 'text',
          required: false,
        },
        {
          name: 'title',
          label: 'Titre',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'link',
          label: 'Lien',
          type: 'text',
          required: false,
        },
      ],
    },
    sectionStyleField,
  ],
}
