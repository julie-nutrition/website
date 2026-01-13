import { Block } from 'payload'

export const Button: Block = {
  slug: 'button',
  fields: [
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Lien URL',
      required: false,
      admin: {
        description: 'URL de destination (ex: /contact ou https://calendly.com/...)',
      },
    },
    {
      name: 'variant',
      type: 'select',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Inverse',
          value: 'inverse',
        },
      ],
      defaultValue: 'primary',
      required: true,
    },
  ],
}
