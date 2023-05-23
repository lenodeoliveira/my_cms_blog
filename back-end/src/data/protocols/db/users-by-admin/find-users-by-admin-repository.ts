
import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'

export interface FindUsersByAdminRepository {
  findUsers: (data: FindUsersByAdminRepository.Params) => Promise<FindUsersByAdminRepository.Result>
}

export namespace FindUsersByAdminRepository {
  export type Params = FindUserByAdmin.Params
  export type Result = FindUserByAdmin.Result
}