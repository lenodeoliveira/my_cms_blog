export interface LoadContent {
  loadOne: (slug: string) => Promise<LoadContent.Result>
}

export namespace LoadContent {
  export type Result = {
    id: string
    title: string
    author: string,
    slug: string
    image?: string
    body: string
    published: number
    createAt: Date
    updateAt: Date
  }
}
