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
