export const updateUsersPath = {
    put: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Users'],
        summary: 'API para atualizar usuários',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'path',
            name: 'Id',
            required: true,
            schema: {
                type: 'string'
            }
        }],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/usersUpdateParamsSchema'
                    }
                }
            }
        },
        responses: {
            204: {
                description: 'Sucesso, mas sem dados para exibir'
            },
            403: {
                $ref: '#/components/forbidden'
            },
            404: {
                $ref: '#/components/notFound'
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    },
}