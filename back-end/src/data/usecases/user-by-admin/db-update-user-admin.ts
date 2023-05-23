import { UpdateUserByAdmin } from '@/domain/usecases/users/update-user'
import { UpdateUserByAdminRepository } from '@/data/protocols/db/users-by-admin/update-users-by-admin-repository'
import { LoadAccountByByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'

export class DbUpdateUserByAdmin implements UpdateUserByAdmin {
    constructor (
    private readonly updateUserByAdminRepository: UpdateUserByAdminRepository,
    private readonly loadAccountByByIdRepository: LoadAccountByByIdRepository,
    ) {}
    async updateUserByAdmin (user: UpdateUserByAdmin.Params): Promise<boolean> {
        const account = await this.loadAccountByByIdRepository.loadById(user.id)

        let updatedUser = false
        if (account) {
            updatedUser = await this.updateUserByAdminRepository.updateUser(user) 
        }
        return updatedUser
    }
  
}