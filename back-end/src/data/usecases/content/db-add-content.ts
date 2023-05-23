import { AddContentRepository } from '@/data/protocols/db/content/admin/add-content-repository'
import { CheckSlugRepository } from '@/data/protocols/db/content/check-slug-repository'
import { AddContent } from '@/domain/usecases/content/add-content'

export class DbAddContent implements AddContent {
    constructor (
      private readonly addContentRepository: AddContentRepository, 
      private readonly checkSlugRepository: CheckSlugRepository
    ) {}

    async add (data: AddContent.Params): Promise<AddContent.Result> {
        const exists = await this.checkSlugRepository.checkSlug(data.slug)
        let isValid = false
        if (!exists) {
            isValid = await  this.addContentRepository.add(data)
        }
        return isValid
    } 
}