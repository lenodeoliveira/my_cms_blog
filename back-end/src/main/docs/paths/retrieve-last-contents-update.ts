/* eslint-disable no-useless-escape */
export const retrieveLastContentsUpdatePath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Dashboard'],
        summary: 'API para listar todas os conteúdos para os administradores',
        description: 'Essa rota só pode ser executada por **administradores**',
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

        },
        {
            in: 'query',
            name: 'orientation',
            description: 'Orientação do conteúdo',
            required: false,
            schema: {
                type: 'string'
            },

        },
        {
            in: 'query',
            name: 'orderBy',
            description: 'Ordenação do conteúdo',
            required: false,
            schema: {
                type: 'string'
            },

        },
        {
            in: 'query',
            name: 'start',
            description: 'data de inicio',
            required: true,
            schema: {
                type: 'string',
                format: 'date-time',
                example: '2017-07-21T17:32:28Z'
            },
        },
        {
            in: 'query',
            name: 'end',
            description: 'data de fim',
            required: true,
            schema: {
                type: 'string',
                format: 'date-time',
                example: '2017-07-21T17:32:28Z'
            },
        }
        ],
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/retrieveLastUpdateContents'
                        }
                    }
                }
            },
            204: {
                description: 'Sucesso, mas sem dados para exibir'
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