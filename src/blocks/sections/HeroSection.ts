import { sectionStyleField } from '@/fields/section-style.field'
import { Block } from 'payload'
import { Button } from '../Button'

export const HeroSection: Block = {
  slug: 'hero-section',
  interfaceName: 'HeroSection',
  labels: {
    singular: "Section d'accueil",
    plural: "Sections d'accueil",
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'textarea',
      required: true,
    },
    {
      name: 'picture',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      type: 'blocks',
      name: 'actions',
      label: 'Actions',
      required: false,
      blocks: [Button],
    },
    sectionStyleField,
  ],
}
