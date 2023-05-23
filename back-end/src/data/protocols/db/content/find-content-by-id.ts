export interface FindContentByIdRepository {
  findById: (id: string) => Promise<FindContentByIdRepository.Result>
}

export namespace FindContentByIdRepository {
  export type Result = boolean
}