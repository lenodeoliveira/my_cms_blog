import { LoadFiles } from '@/domain/usecases/files/load-files'

export interface LoadFilesRepository {
  loadAll: (params: LoadFilesRepository.Params) => Promise<LoadFilesRepository.Result>
}

export namespace LoadFilesRepository {
  export type Params = LoadFiles.Params
  export type Result = LoadFiles.Result
}
