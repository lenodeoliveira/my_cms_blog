export const deleteUploadImageContentPath = {
    delete: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Uploads'],
        summary: 'API para remover uma imagem',
        description: 'Essa rota só pode ser executada por **administradores**',
        parameters: [{
            in: 'path',
            name: 'image',
            description: 'nome da imagem',
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