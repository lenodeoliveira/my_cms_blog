import { FindUsersByAdminRepository } from '@/data/protocols/db/users-by-admin/find-users-by-admin-repository'
import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'

export class DbFindUsersByAdmin implements FindUserByAdmin {
    constructor (
      private readonly findUsersByAdminRepository: FindUsersByAdminRepository
    ){}
    async findUsers (params: FindUserByAdmin.Params): Promise<FindUserByAdmin.Result> {
        return await this.findUsersByAdminRepository.findUsers(params)
    }
  
}