import { ResetPasswordRepository } from '@/data/protocols/db/reset-password/reset-password'
import { ResetUserPassword } from '@/domain/usecases/reset-password/reset-password'
export class ResetPasswordRepositorySpy implements ResetPasswordRepository {

    data: ResetUserPassword.Params
    result = true

    async resetPassword (data: ResetUserPassword.Params): Promise<boolean> {
        this.data = data
        return this.result
    }
}
