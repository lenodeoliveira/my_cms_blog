export const updateContentsPath = {
    put: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Contents by admin'],
        summary: 'API para atualizar conteúdo',
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
                        $ref: '#/schemas/updateContent'
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
