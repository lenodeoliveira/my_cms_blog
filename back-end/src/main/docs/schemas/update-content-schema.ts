export const updateContentSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        slug: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        body: {
            type: 'string',
        },
        published: {
            type: 'number',
        },

    },
    required: ['title', 'slug', 'body', 'published']
}
