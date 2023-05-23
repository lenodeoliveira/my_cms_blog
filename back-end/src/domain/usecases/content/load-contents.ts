export interface LoadContents {
  load: (params: LoadContents.Params) => Promise<LoadContents.Result>
}

export namespace LoadContents {
  export type Params = {
    page: number
    limit: number
  }
}

export namespace LoadContents {
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