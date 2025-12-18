import { Block } from 'payload'

export const ServiceCard: Block = {
  slug: 'service-card',
  fields: [
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
}
