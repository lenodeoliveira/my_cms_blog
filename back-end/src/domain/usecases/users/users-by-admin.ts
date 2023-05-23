export interface FindUserByAdmin {
   findUsers: (params: FindUserByAdmin.Params) => Promise<FindUserByAdmin.Result>
}

export namespace FindUserByAdmin {
  export type Params = {
    page?: number
    limit?: number
  }
  export type Result = {
    count: number
    rows: Users[]
  }
}

type Users = {
  id: string
  name: string
  email: string
  status: number
  role: string
  createdAt: Date
  updatedAt: Date
}

