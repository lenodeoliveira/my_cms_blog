import { AddFileRepository } from '@/data/protocols/db/files/add-file-repository'
import { RemoveFileRepository } from '@/data/protocols/db/files/remove-file-repository'
import { LoadFilesRepository } from '@/data/protocols/db/files/load-files-repository'
import { LoadFiles } from '@/domain/usecases/files/load-files'
import { mockLoadFiles } from '@/tests/domain/mock-files'

export class AddFileRepositorySpy implements AddFileRepository {
    params: AddFileRepository.Params

    async addFile (file: AddFileRepository.Params): Promise<void> {
        this.params = file
    }
}

export class RemoveFileRepositorySpy implements RemoveFileRepository {
    text: string
    async removeFile (text: string): Promise<void> {
        this.text = text
    }
}

export class LoadFilesRepositorySpy implements LoadFilesRepository {
    params: LoadFiles.Params
    result = mockLoadFiles()

    async loadAll (params: LoadFiles.Params): Promise<LoadFiles.Result> {
        this.params = params  
        return this.result
    }
}