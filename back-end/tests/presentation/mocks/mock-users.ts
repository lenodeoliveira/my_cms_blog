import { RegisterUserByAdmin } from '@/domain/usecases/users/register-users'
import { UpdateUserByAdmin } from '@/domain/usecases/users/update-user'
import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'
import { mockUser } from '@/tests/domain/mock-users'

export class RegisterUserByAdminSpy implements RegisterUserByAdmin {
    params: RegisterUserByAdmin.Params 
    result = true

    async register (user: RegisterUserByAdmin.Params): Promise<RegisterUserByAdmin.Result> {
        this.params = user
        return this.result
    }
}

export class UpdateUserByAdminSpy implements UpdateUserByAdmin {
    params: UpdateUserByAdmin.Params 
    result = true

    async updateUserByAdmin (user: UpdateUserByAdmin.Params): Promise<UpdateUserByAdmin.Result> {
        this.params = user
        return this.result
    }
}

export class FindUserByAdminSpy implements FindUserByAdmin {

    params: FindUserByAdmin.Params 
    result = mockUser()
    
    async findUsers (user: FindUserByAdmin.Params): Promise<FindUserByAdmin.Result> {
        this.params = user
        return this.result
    }
}