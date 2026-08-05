import { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'hero-section',
  labels: {
    singular: 'Section de présentation',
    plural: 'Sections de présentation',
  },
  fields: [
    {
      name: 'tags',
      type: 'array',
      label: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label du tag',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: "Nom de l'icône du tag",
        },
      ],
    },
    {
      name: 'header',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description de la section',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de la section',
    },
    {
      name: 'actions',
      type: 'array',
      label: {
        singular: 'Action',
        plural: 'Actions',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: "Label de l'action",
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: "Lien de l'action",
          required: true,
        },
      ],
    },
  ],
}
