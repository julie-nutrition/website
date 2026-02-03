import { Block } from 'payload'

export const Button: Block = {
  slug: 'button',
  fields: [
    {
      name: 'icon',
      label: 'Icône',
      type: 'text',
    },
    {
      name: 'label',
      label: 'Texte du bouton',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Lien URL',
      required: false,
      admin: {
        description: 'URL de destination (ex: /consultations ou https://calendly.com/...)',
      },
    },
    {
      name: 'variant',
      label: 'Variante',
      type: 'radio',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
      ],
      defaultValue: 'primary',
      required: true,
    },
  ],
}
