export const paginationContentPath = {
    get: {
        tags: ['Contents'],
        summary: 'API para paginar conteúdo',
        description: 'Essa rota é **pública**',
        parameters: [{
            in: 'query',
            name: 'page',
            description: 'paginação',
            required: true,
            schema: {
                type: 'number'
            },
        }, {
            in: 'query',
            name: 'limit',
            description: 'limite de conteúdos',
            required: true,
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
                            $ref: '#/schemas/content'
                        }
                    }
                }
            },
            500: {
                $ref: '#/components/serverError'
            }
        }
    },
}