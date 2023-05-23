export interface RegisterUserByAdmin {
  register: (user: RegisterUserByAdmin.Params) => Promise<RegisterUserByAdmin.Result>
}

export namespace RegisterUserByAdmin {
  export type Params = {
    name: string
    email: string
    password: string
    status: number
    role: string
  }
  export type Result = boolean
}