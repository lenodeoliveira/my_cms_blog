import { LoadContentByAdminRepository } from '@/data/protocols/db/content/admin/load-content-by-admin-repository'
import { LoadContentByAdmin } from '@/domain/usecases/content/load-content-by-admin'

export class DbLoadContentByAdmin implements LoadContentByAdmin {
    constructor (private readonly loadContentByAdminRepository: LoadContentByAdminRepository) {}
    
    async loadOneContent (id: string): Promise<LoadContentByAdmin.Result | boolean> {
        return await this.loadContentByAdminRepository.loadContentByAdmin(id)
    }
  
}