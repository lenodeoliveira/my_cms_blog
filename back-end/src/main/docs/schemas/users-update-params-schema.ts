export const usersUpdateParamsSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        status: {
            type: 'number'
        },
        role: {
            type: 'string'
        },
    },
    required: ['name']
}