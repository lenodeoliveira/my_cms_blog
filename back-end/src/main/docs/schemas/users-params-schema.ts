export const usersParamsSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        status: {
            type: 'number'
        },
        role: {
            type: 'string'
        },
    },
    required: ['name', 'email', 'password', 'status', 'role']
}