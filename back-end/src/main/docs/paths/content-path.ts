export const contentsPath = {
    get: {
        tags: ['Contents'],
        summary: 'API para listar todas os conteúdos',
        description: 'Essa rota é **pública**',
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
    post: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Contents by admin'],
        summary: 'API para criar conteúdo',
        description: 'Essa rota só pode ser executada por **administradores**',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/addContent'
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
    }
}