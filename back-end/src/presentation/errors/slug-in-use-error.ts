export class SlugInUseError extends Error {
    constructor () {
        super('The received slug is already in use')
        this.name = 'SlugInUseError'
    }
}
