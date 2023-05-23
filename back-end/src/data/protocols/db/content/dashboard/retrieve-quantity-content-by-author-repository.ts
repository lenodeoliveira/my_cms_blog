import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'

export interface RetrieveQuantityContentByAuthorRepository {
  retrieveContents: () => Promise<RetrieveQuantityContentByAuthorRepository.Result>
}

export namespace RetrieveQuantityContentByAuthorRepository {
  export type Result = RetrieveQuantityContentByAuthor.Result
}