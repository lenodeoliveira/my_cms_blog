import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'

export interface RetrieveLastUpdateContentsRepository {
  loadLastContents: (params: RetrieveLastUpdateContentsRepository.Params) => Promise<RetrieveLastUpdateContentsRepository.Result>
}

export namespace RetrieveLastUpdateContentsRepository {
  export type Params = RetrieveLastUpdateContents.Params
  export type Result = RetrieveLastUpdateContents.Result
}