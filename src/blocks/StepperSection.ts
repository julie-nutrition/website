import { Block } from 'payload'

export const StepperSection: Block = {
  slug: 'stepper-section',
  labels: {
    singular: 'Section étapes',
    plural: 'Sections étapes',
  },
  fields: [
    {
      name: 'meta-title',
      type: 'text',
      label: 'Titre global de la section',
    },
    {
      name: 'header',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'description',
      label: 'Description de la section',
      type: 'textarea',
    },
    {
      name: 'steps',
      label: 'Liste des étapes',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: "Titre de l'étape",
        },
        {
          name: 'icon',
          type: 'text',
          label: "Icône de l'étape",
        },
        {
          name: 'description',
          type: 'textarea',
          label: "Description de l'étape",
        },
      ],
    },
  ],
}
