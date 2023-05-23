import { ResetUserPassword } from '@/domain/usecases/reset-password/reset-password'

export class ResetUserPasswordSpy implements  ResetUserPassword {
    params: ResetUserPassword.Params
    result = true
  
    async resetPassword(params: ResetUserPassword.Params): Promise<string | boolean> {
        this.params = params
        return this.result
    }
}