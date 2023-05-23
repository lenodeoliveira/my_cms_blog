export class TokenExpiredError extends Error {
    constructor () {
        super('Token expired, generate a new one')
        this.name = 'TokenExpiredError'
    }
}
