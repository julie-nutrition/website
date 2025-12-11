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
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'duration',
            type: 'number',
        }
    ],
    admin: {
        useAsTitle: 'title',
    }
}