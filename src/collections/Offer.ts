import { CollectionConfig } from 'payload'

export const Offer: CollectionConfig = {
  slug: 'offers',
  labels: {
    singular: 'Offre',
    plural: 'Offres',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: "Titre de l'offre",
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'Prix (en €)',
          type: 'number',
          required: true,
        },
        {
          name: 'quantity',
          label: 'Quantité (ex: "séance", "1h", etc.)',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      label: 'Description courte',
      type: 'textarea',
      required: true,
    },
    {
      name: 'disclaimer',
      label: 'Texte de disclaimer (optionnel)',
      type: 'textarea',
      required: false,
      admin: {
        description:
          "Texte affiché en bas de la carte d'offre pour les offres moins mises en avant. Laissez vide si non utilisé.",
      },
    },
    {
      name: 'features',
      label: 'Fonctionnalités / Avantages',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'feature',
          label: 'Fonctionnalité / Avantage',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bookingLink',
      type: 'text',
      label: 'Lien de réservation',
      admin: {
        description: 'URL externe pour réserver cette offre (ex: lien Calendly)',
      },
    },
  ],
}
