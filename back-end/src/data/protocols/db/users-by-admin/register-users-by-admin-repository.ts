
import { RegisterUserByAdmin } from '@/domain/usecases/users/register-users'

export interface RegisterUserByAdminRepository {
  registerUser: (data: RegisterUserByAdminRepository.Params) => Promise<RegisterUserByAdminRepository.Result>
}

export namespace RegisterUserByAdminRepository {
  export type Params = RegisterUserByAdmin.Params
  export type Result = boolean
}