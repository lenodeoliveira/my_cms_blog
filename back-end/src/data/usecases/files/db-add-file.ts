import { AddFile } from '@/domain/usecases/files/add-file'
import { AddFileRepository } from '@/data/protocols/db/files/add-file-repository'

export class DbAddFile implements AddFile {
    constructor (
    private readonly addFileRepository: AddFileRepository,
    ) {}

    async addFile (file: AddFile.Params): Promise<void> {
        await this.addFileRepository.addFile(file)
    }
}