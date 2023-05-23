export const filesSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        ext: {
            type: 'string'
        },
        url: {
            type: 'string',
        },
        size: {
            type: 'number',
        },
        mime: {
            type: 'string',
        },
        folderPath: {
            type: 'string',
        },

    },
    required: ['id', 'name', 'ext', 'url', 'size', 'mime', 'folderPath']
}