
import { ResetUserPassword } from '@/domain/usecases/reset-password/reset-password'

export interface ResetPasswordRepository {
  resetPassword: (data: ResetPasswordRepository.Params) => Promise<boolean>
}

export namespace ResetPasswordRepository {
  export type Params = ResetUserPassword.Params
}