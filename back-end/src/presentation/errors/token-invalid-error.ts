export class TokenInvalidError extends Error {
    constructor () {
        super('Token invalid')
        this.name = 'TokenInvalidError'
    }
}
