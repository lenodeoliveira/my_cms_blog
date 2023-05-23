export interface CheckSlugRepository {
  checkSlug: (slug: string) => Promise<CheckSlugRepository.Result>
}

export namespace CheckSlugRepository {
  export type Result = boolean
}