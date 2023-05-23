export interface UpdateUserByAdmin {
  updateUserByAdmin: (user: UpdateUserByAdmin.Params) => Promise<UpdateUserByAdmin.Result>
}

export namespace UpdateUserByAdmin {
  export type Params = {
    id: string
    name: string
    email?: string
    status?: number
    role?: string
  }
  export type Result = boolean | string
}