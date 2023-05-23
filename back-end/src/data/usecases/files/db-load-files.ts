import { LoadFiles } from '@/domain/usecases/files/load-files'
import { LoadFilesRepository } from '@/data/protocols/db/files/load-files-repository'

export class DbLoadFile implements LoadFiles {
    constructor (
    private readonly loadFilesRepository: LoadFilesRepository,
    ) {}

    async load (params: LoadFiles.Params): Promise<LoadFiles.Result> {
        const contents = await this.loadFilesRepository.loadAll(params)
        return contents
    }
}