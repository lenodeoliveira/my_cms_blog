import { LoadContentRepository } from '@/data/protocols/db/content/load-content-repository'
import { LoadContent } from '@/domain/usecases/content/load-content'

export class DbLoadContent implements LoadContent {
    constructor (private readonly loadContentRepository: LoadContentRepository) {}

    async loadOne (slug: string): Promise<LoadContent.Result> {
        return await this.loadContentRepository.findOneContent(slug)
    } 
}