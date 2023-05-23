

export const contentsByAuthorsSchema = {
    type: 'array',
    items: {
        $ref: '#/schemas/contentByAuthor'
    }
}