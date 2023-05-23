export const resetPasswordSchema = {
    type: 'object',
    properties: {
        password: {
            type: 'string'
        },
        passwordConfirmation: {
            type: 'string'
        }
    },
    required: ['email', 'passwordConfirmation']
}