import { RegisterUserByAdminRepository } from '@/data/protocols/db/users-by-admin/register-users-by-admin-repository'
import { UpdateUserByAdminRepository } from '@/data/protocols/db/users-by-admin/update-users-by-admin-repository'
import { mockUser } from '@/tests/domain/mock-users'
import { FindUsersByAdminRepository } from '@/data/protocols/db/users-by-admin/find-users-by-admin-repository'
import { RetrieveUserByAdminRepository } from '@/data/protocols/db/users-by-admin/retrieve-user-by-admin-repository'
import { mockRetrieveUserByAdmin } from '@/tests/domain/mock-account'
export class RegisterUserByAdminRepositorySpy implements RegisterUserByAdminRepository {
    params: RegisterUserByAdminRepository.Params 
    result = true

    async registerUser (data: RegisterUserByAdminRepository.Params): Promise<RegisterUserByAdminRepository.Result> {
        this.params = data
        return this.result
    }
}

export class UpdateUserByAdminRepositorySpy implements UpdateUserByAdminRepository {

    params: UpdateUserByAdminRepository.Params 
    result = true

    async updateUser (data: UpdateUserByAdminRepository.Params): Promise<UpdateUserByAdminRepository.Result> {
        this.params = data
        return this.result
    }
}

export class FindUserByAdminRepositorySpy implements FindUsersByAdminRepository {
    params: FindUsersByAdminRepository.Params 
    result = mockUser()

    async findUsers (data: FindUsersByAdminRepository.Params): Promise<FindUsersByAdminRepository.Result> {
        this.params = data
        return this.result
    }
}

export class RetrieveUserByAdminRepositorySpy implements RetrieveUserByAdminRepository {
    id: string
    result = mockRetrieveUserByAdmin()

    async retrieveUser (id: string): Promise<RetrieveUserByAdminRepository.Result> {
        this.id = id
        return this.result
    }
}

