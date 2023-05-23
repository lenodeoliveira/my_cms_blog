export const retrieveLastUpdateContentSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        lastUpdate: {
            type: 'string'
        },
        author: {
            type: 'string'
        },

    },
    required: ['id', 'title', 'content', 'lastUpdate', 'author']
}