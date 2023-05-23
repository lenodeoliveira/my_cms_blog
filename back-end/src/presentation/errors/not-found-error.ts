export class NotFoundError extends Error {
    constructor (text: string) {
        super(`${text}`)
        this.name = 'NotFoundError'
    }
}

