import { Block } from 'payload'

export const InfoSection: Block = {
  slug: 'info-section',
  labels: {
    singular: "Section d'information",
    plural: "Sections d'information",
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
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Média de la section',
    },
  ],
}
