import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'

export interface LoadContentsByAdminRepository {
  loadContentsByAdmin: (params: LoadContentsByAdmin.Params) => Promise<LoadContentsByAdminRepository.Result>
}

export namespace LoadContentsByAdminRepository {
  export type Params = LoadContentsByAdmin.Params
  export type Result = LoadContentsByAdmin.Result
}