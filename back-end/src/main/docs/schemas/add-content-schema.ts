export const addContentSchema = {
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
            type: 'string',
        },

    },
    required: ['title', 'slug', 'body', 'published']
}
