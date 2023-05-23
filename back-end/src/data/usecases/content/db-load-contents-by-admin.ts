import { LoadContentsByAdminRepository } from '@/data/protocols/db/content/admin/load-contents-by-admin-repository'
import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'

export class DbLoadContentsByAdmin implements LoadContentsByAdmin {
    constructor (private readonly loadContentsByAdminRepository: LoadContentsByAdminRepository) {}

    async load (params: LoadContentsByAdmin.Params): Promise<LoadContentsByAdmin.Result> {
        return await this.loadContentsByAdminRepository.loadContentsByAdmin(params)
    } 
}