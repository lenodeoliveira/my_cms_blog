export const usersPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Users'],
        summary: 'API para listar usuários',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'query',
            name: 'page',
            description: 'paginação',
            schema: {
                type: 'number'
            },
        }, {
            in: 'query',
            name: 'limit',
            description: 'limite de conteúdos',
            schema: {
                type: 'number'
            },

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
    },
    post: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Users'],
        summary: 'API para atualizar usuários',
        description: 'Essa rota só pode ser executada por **administradores**',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/usersParamsSchema'
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