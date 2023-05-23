import { RemoveFileRepository } from '@/data/protocols/db/files/remove-file-repository'
import { RemoveFile } from '@/domain/usecases/files/remove-file'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

export class Files implements RemoveFile {
    constructor(
      private readonly removeFileRepository: RemoveFileRepository
    ){}
    async removeFile(text: string): Promise<void> {
        promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..','static', text))
        await this.removeFileRepository.removeFile(text)
    }
}