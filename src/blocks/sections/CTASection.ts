import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'
import { Button } from '../Button'

export const CTASection: Block = {
  slug: 'cta-section',
  labels: {
    singular: "Section d'appel à l'action",
    plural: "Sections d'appel à l'action",
  },
  fields: [
    {
      name: 'title',
      label: "Titre de l'appel à l'action",
      admin: {
        description: 'Texte principal incitant l’utilisateur à agir, souvent une question',
      },
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
      type: 'blocks',
      name: 'actions',
      label: 'Actions',
      required: true,
      minRows: 1,
      blocks: [Button],
    },
    sectionStyleField,
  ],
}
