export const uploadImageContent = {
    type: 'object',
    properties: {
        image: {
            type: 'file',
            format: 'binary'
        }
    },
}