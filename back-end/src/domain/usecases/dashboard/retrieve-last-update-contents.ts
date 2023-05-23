export interface RetrieveLastUpdateContents {
  loadLastContents: (params: RetrieveLastUpdateContents.Params) => Promise<RetrieveLastUpdateContents.Result>
}

export namespace RetrieveLastUpdateContents {
  export type Params = {
    orientation?: string
    orderBy?: string
    page?: number
    limit?: number
    start: Date
    end: Date
  }
}

export namespace RetrieveLastUpdateContents {
  export type Result = {
    count: number
    rows: Contents[] 
  }
}

type Contents = {
  id: string
  title: string
  author: string
  content: string
  lastUpdate: Date
}