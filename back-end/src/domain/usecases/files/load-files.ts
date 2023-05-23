export interface LoadFiles {
  load: (params: LoadFiles.Params) => Promise<LoadFiles.Result>
}

export namespace LoadFiles {
  export type Params = {
    page?: number
    limit?: number
    orderBy?: string
    orientation?: string
  }
}

export namespace LoadFiles {
  export type Result = {
    count: number
    rows: Files[] 
  }
}

type Files = {
  id: string
  name: string
  ext: string
  url: string
  mime: string
  size: number
  folderPath: string
  createdAt: Date
  updatedAt: Date
  createdAtById: string
  updatedById: string
}
