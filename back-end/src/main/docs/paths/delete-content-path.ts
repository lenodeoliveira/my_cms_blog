export const deleteContentsPath = {
    delete: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Contents by admin'],
        summary: 'API para criar conteúdo',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'path',
            name: 'contentId',
            description: 'Id de um conteúdo',
            required: true,
            schema: {
                type: 'string'
            }
        }],
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