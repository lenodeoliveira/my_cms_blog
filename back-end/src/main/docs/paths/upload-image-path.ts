export const uploadImageContentPath = {
    post: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Uploads'],
        summary: 'API para fazer upload de imagens',
        description: 'Essa rota só pode ser executada por **administradores**',
        requestBody: {
            required: true,
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/schemas/uploadImageContent'
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