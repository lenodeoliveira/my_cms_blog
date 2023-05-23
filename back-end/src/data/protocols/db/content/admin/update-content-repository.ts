export interface UpdateContentRepository {
  update: (content: UpdateContentRepository.Result) => Promise<void>
}

export namespace UpdateContentRepository {
  export type Result = {
    id: string
    title: string
    userId: string
    slug: string
    image?: string
    body: string
    published: number
  }
}