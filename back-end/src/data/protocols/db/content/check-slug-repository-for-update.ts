export interface CheckSlugRepositoryForUpDate {
  checkSlugForUpdate: (id: string, slug: string) => Promise<CheckSlugRepositoryForUpDate.Result>
}

export namespace CheckSlugRepositoryForUpDate {
  export type Result = boolean
}

