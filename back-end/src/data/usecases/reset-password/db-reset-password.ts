import { ResetPasswordRepository } from '@/data/protocols/db/reset-password/reset-password'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { ResetUserPassword } from '@/domain/usecases/reset-password/reset-password'
import { Hasher } from '@/data/protocols/cryptography'

export class DbResetPassword implements ResetUserPassword {
    constructor(
      private readonly resetPasswordRepository: ResetPasswordRepository,
      private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
      private readonly hasher: Hasher,
    ){}

    async resetPassword (params: ResetUserPassword.Params): Promise<string | boolean> {
        const user = await this.loadAccountByEmailRepository.loadByEmail(params.email)
        if (!user) {
            return false
        }
        const error = this.validateToken(user.passwordResetToken, params.code, user.passwordResetExpires )
        if (error) return error

        const hashedPassword = await this.hasher.hash(params.password)
        
        return await this.resetPasswordRepository.resetPassword({ ...params, password: hashedPassword })
    }

    validateToken(passwordResetToken: string, code: string,passwordResetExpires: Date): string {
        const now = new Date()
        if(now > passwordResetExpires) return 'expired'
        if(passwordResetToken !== code) return 'invalid'
        return null
    }
} 