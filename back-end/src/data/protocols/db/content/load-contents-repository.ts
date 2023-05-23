import { LoadContents } from '@/domain/usecases/content/load-contents'

export interface LoadContentsRepository {
  loadAll: (params: LoadContentsRepository.Params) => Promise<LoadContents.Result>
}

export namespace LoadContentsRepository {
  export type Params = {
    page: number
    limit: number
  }
}
