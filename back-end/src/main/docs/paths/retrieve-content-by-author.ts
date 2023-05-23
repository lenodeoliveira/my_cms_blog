/* eslint-disable no-useless-escape */
export const retrieveContentByAuthorPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Dashboard'],
        summary: 'API para listar todas os conteúdos para os administradores',
        description: 'Essa rota só pode ser executada por **administradores**',
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/contentsByAuthors'
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