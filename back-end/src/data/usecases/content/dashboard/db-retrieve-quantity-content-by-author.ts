import { RetrieveQuantityContentByAuthorRepository } from '@/data/protocols/db/content/dashboard/retrieve-quantity-content-by-author-repository'
import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'

export class DbRetrieveQuantityContentByAuthor implements RetrieveQuantityContentByAuthor {
    constructor (private readonly retrieveQuantityContentByAuthorRepository: RetrieveQuantityContentByAuthorRepository) {}

    async retrieveContents (): Promise<RetrieveQuantityContentByAuthorRepository.Result> {
        return await this.retrieveQuantityContentByAuthorRepository.retrieveContents()
    } 
}