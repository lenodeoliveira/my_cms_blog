import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async load (accessToken: string, status: number, role?: string): Promise<LoadAccountByToken.Result> {
        let accountToken: any
        try {
            accountToken = await this.decrypter.decrypt(accessToken)
        } catch (error: any) {
            return null
        }
        if (accountToken) {
            const account = await this.loadAccountByTokenRepository.loadByToken(accountToken.id, status, role)
            if (account) {
                return account
            }
        }

        return null
    }
}
