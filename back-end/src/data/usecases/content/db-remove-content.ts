import { RemoveContent } from '@/domain/usecases/content/remove-content'
import { RemoveContentRepository } from '@/data/protocols/db/content/admin/remove-content-repository'

export class DbRemoveContent implements RemoveContent {
    constructor (private readonly removeContentRepository: RemoveContentRepository) {}
    
    async removeContent (id: string): Promise<boolean> {
        const wasRemoved = await this.removeContentRepository.remove(id)
        return wasRemoved
    }
}