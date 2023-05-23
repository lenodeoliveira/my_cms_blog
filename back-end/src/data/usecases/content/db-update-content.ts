import { UpdateContent } from '@/domain/usecases/content/update-content'
import { UpdateContentRepository } from '@/data/protocols/db/content/admin/update-content-repository'
import { CheckSlugRepositoryForUpDate } from '@/data/protocols/db/content/check-slug-repository-for-update'

export class DbUpdateContent implements UpdateContent {
    constructor (
      private readonly updateContentRepository: UpdateContentRepository,
      private readonly checkSlugRepositoryForUpDate: CheckSlugRepositoryForUpDate,
    ) {}
    
    async updateContent (content: UpdateContent.Request): Promise<UpdateContent.Result> {
        const existsSlug = await this.checkSlugRepositoryForUpDate.checkSlugForUpdate(content.id, content.slug)
        if (!existsSlug) {
            await this.updateContentRepository.update(content)
        }

        return existsSlug
    }
}
