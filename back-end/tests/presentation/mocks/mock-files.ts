import { RemoveFile } from '@/domain/usecases/files/remove-file'
import { AddFile } from '@/domain/usecases/files/add-file'
import { LoadFiles } from '@/domain/usecases/files/load-files'
import { mockLoadFiles } from '@/tests/domain/mock-files'

export class RemoveFileSpy implements RemoveFile {
    params: string
    async removeFile (text: string): Promise<void> {
        this.params = text
    }
}

export class AddFileSpy implements AddFile {

    params: AddFile.Params
    async addFile (file: AddFile.Params): Promise<void> {
        this.params = file
    }
}

export class LoadFilesSpy implements LoadFiles {
    params: LoadFiles.Params
    result: LoadFiles.Result = mockLoadFiles()

    async load (params: LoadFiles.Params): Promise<LoadFiles.Result> {
        this.params = params
        return this.result
    }
}