import { Block } from 'payload'

export const TestimonialSection: Block = {
  slug: 'testimonial-section',
  labels: {
    singular: 'Section de témoignages',
    plural: 'Sections de témoignages',
  },
  fields: [
    {
      name: 'meta-title',
      type: 'text',
      label: 'Meta title de la section',
    },
    {
      name: 'header',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: {
        singular: 'Témoignage',
        plural: 'Témoignages',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: "Nom de l'auteur du témoignage",
        },
        {
          name: 'service',
          type: 'text',
          label: "Service fournit à l'auteur du témoignage",
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Contenu du témoignage',
        },
      ],
    },
  ],
}
