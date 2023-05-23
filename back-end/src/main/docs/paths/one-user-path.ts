export const oneUserPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Users'],
        summary: 'API para buscar um usuário',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'path',
            name: 'userId',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/users'
                        }
                    }
                }
            },
            204: {
                description: 'Sucesso, mas sem dados para exibir'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    }
}