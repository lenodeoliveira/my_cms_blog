export interface LoadContentRepository {
  findOneContent: (slug: string) => Promise<LoadContentRepository.Result>
}

export namespace LoadContentRepository {
  export type Result = {
    id: string
    title: string
    author: string
    slug: string
    image?: string
    body: string
    published: number
    createAt: Date
    updateAt: Date
  }
}