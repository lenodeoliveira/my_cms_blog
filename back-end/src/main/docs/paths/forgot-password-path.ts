export const forgotPasswordPath = {
    post: {
        tags: ['Login'],
        summary: 'API para gerar nova senha',
        description: 'Essa rota é **pública**',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/forgotPasswordSchema'
                    }
                }
            }
        },
        responses: {
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
    }
}