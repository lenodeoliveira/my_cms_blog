
import { AddFile } from '@/domain/usecases/files/add-file'

export interface AddFileRepository {
  addFile: (file: AddFileRepository.Params) => Promise<void>
}

export namespace AddFileRepository {
  export type Params = AddFile.Params
}