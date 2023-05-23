export const loadContentsByAdminPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Contents by admin'],
        summary: 'API para listar todas os conteúdos para os administradores',
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
                            $ref: '#/schemas/contents'
                        }
                    }
                }
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