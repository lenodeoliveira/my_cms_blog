export interface LoadContentsByAdmin {
  load: (params: LoadContentsByAdmin.Params) => Promise<LoadContentsByAdmin.Result>
}

export namespace LoadContentsByAdmin {
  export type Params = {
    page?: number
    limit?: number
  }
}

export namespace LoadContentsByAdmin {
  export type Result = {
    count: number
    rows: Contents[] 
  }
}

type Contents = {
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