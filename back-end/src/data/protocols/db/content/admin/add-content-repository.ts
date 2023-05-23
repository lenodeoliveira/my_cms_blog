import { AddContent } from '@/domain/usecases/content/add-content'

export interface AddContentRepository {
  add: (data: AddContentRepository.Params) => Promise<AddContentRepository.Result>
}

export namespace AddContentRepository {
  export type Params = AddContent.Params
  export type Result = boolean
}