import { Block } from 'payload'

export const IssuesSection: Block = {
  slug: 'issues-section',
  labels: {
    singular: 'Section des problématiques',
    plural: 'Sections des problématiques',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'issues',
      label: 'Problématiques',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icône',
          type: 'text',
        },
        {
          name: 'issue',
          label: 'Problématique',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'solution-title',
      label: 'Titre de la solution',
      type: 'text',
    },
    {
      name: 'solution-content',
      label: 'Contenu de la solution',
      type: 'textarea',
    },
  ],
}
