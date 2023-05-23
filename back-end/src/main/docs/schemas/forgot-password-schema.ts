export const forgotPasswordSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        }
    },
    required: ['email']
}