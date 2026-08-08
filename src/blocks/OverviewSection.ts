import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const OverviewSection: Block = {
  slug: 'overview-section',
  labels: {
    singular: "Section d'explication globale",
    plural: "Sections d'explication globale",
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
      type: 'richText',
      editor: lexicalEditor({
        admin: {
          hideAddBlockButton: true,
          hideGutter: true,
          hideDraggableBlockElement: true,
          hideInsertParagraphAtEnd: true,
        },
      }),
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      label: 'Images de la section',
      hasMany: true,
      maxRows: 3,
    },
  ],
}
