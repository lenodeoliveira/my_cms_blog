export interface UpdateContent {
  updateContent: (content: UpdateContent.Request) => Promise<UpdateContent.Result>
}

export namespace UpdateContent {
  export type Request = {
    id: string
    title: string
    userId: string
    slug: string
    image?: string
    body: string
    published: number
  }

  export type Result = boolean;
}