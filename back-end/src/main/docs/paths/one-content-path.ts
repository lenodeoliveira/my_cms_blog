export const oneContentPath = {
    get: {
        tags: ['Contents'],
        summary: 'API para listar um conteúdo',
        description: 'Essa rota é **pública**',
        parameters: [{
            in: 'path',
            name: 'Slug',
            description: 'Slug de um conteúdo',
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
                            $ref: '#/schemas/content'
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