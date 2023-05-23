export const oneContentByAdminPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Contents by admin'],
        summary: 'API para listar um conteúdo',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'path',
            name: 'Id',
            description: 'id de um conteúdo',
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