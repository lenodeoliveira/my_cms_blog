export const resetPasswordPath = {
    post: {
        tags: ['Login'],
        summary: 'API para gerar nova senha',
        description: 'Essa rota é **pública**',
        parameters: [{
            in: 'query',
            name: 'code',
            description: 'codigo gerado para adicionar nova senha',
            required: true,
            schema: {
                type: 'string'
            },
        }, {
            in: 'query',
            name: 'email',
            description: 'email do usuario que gerou o código',
            required: true,
            schema: {
                type: 'string'
            },

        }],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/resetPasswordSchema'
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