import { RetrieveLastUpdateContentsRepository } from '@/data/protocols/db/content/dashboard/retrieve-last-update-contents-repository'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'

export class DbRetrieveLastUpdateContents implements RetrieveLastUpdateContents {
    constructor (private readonly retrieveLastUpdateContentsRepository: RetrieveLastUpdateContentsRepository) {}

    async loadLastContents (params: RetrieveLastUpdateContents.Params): Promise<RetrieveLastUpdateContents.Result> {
        return await this.retrieveLastUpdateContentsRepository.loadLastContents(params)
    } 
}