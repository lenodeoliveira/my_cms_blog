export const signUpPath = {
    post: {
        tags: ['Login'],
        summary: 'API para cadastrar usuário',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signUpParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/account'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            401: {
                $ref: '#/components/unauthorized'
            },
            404: {
                $ref: '#/components/notFound'
            },
            500: {
                $ref: '#/components/serverError'
            },
        }
    }
}