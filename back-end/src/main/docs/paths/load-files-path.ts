export const loadFilesPath = {
    get: {
        tags: ['Uploads'],
        summary: 'API para paginar arquivos',
        description: 'Essa rota é **pública**',
        parameters: [{
            in: 'query',
            name: 'page',
            description: 'paginação',
            required: false,
            schema: {
                type: 'number'
            },
        }, {
            in: 'query',
            name: 'limit',
            description: 'limite de conteúdos',
            required: false,
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
                            $ref: '#/schemas/files'
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
}