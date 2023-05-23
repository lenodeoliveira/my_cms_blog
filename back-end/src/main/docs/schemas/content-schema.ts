export const contentSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        userId: {
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
    required: ['id', 'userId', 'title', 'slug', 'image', 'body', 'published']
}