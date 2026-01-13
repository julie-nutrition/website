import { CollectionConfig } from "payload";

export const Offer: CollectionConfig = {
    slug: 'offer',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Description courte',
        },
        {
            name: 'features',
            type: 'array',
            label: 'Ce qui est inclus',
            required: true,
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                }
            ],
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'duration',
            type: 'number',
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
    admin: {
        useAsTitle: 'title',
    }
}