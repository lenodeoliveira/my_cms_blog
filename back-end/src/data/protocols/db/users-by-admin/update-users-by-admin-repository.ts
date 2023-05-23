
import { UpdateUserByAdmin } from '@/domain/usecases/users/update-user'

export interface UpdateUserByAdminRepository {
  updateUser: (data: UpdateUserByAdminRepository.Params) => Promise<UpdateUserByAdminRepository.Result>
}

export namespace UpdateUserByAdminRepository {
  export type Params = UpdateUserByAdmin.Params
  export type Result = boolean
}
