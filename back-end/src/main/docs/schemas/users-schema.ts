export const usersSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        status: {
            type: 'number'
        },
        role: {
            type: 'string'
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
    }
}