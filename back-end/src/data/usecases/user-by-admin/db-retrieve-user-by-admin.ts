import { RetrieveUserByAdminRepository } from '@/data/protocols/db/users-by-admin/retrieve-user-by-admin-repository'
import { RetrieveUserByAdmin } from '@/domain/usecases/users/retrieve-user'
export class DbRetrieveUserByAdmin implements RetrieveUserByAdmin {
    constructor(
    private readonly retrieveUserByAdminRepository: RetrieveUserByAdminRepository,
    ) {}
    async retrieveUser (id: string): Promise<RetrieveUserByAdminRepository.Result> {
        return await this.retrieveUserByAdminRepository.retrieveUser(id)
    }
}