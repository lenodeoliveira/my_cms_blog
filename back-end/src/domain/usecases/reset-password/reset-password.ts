export interface ResetUserPassword{
  resetPassword: (params: ResetUserPassword.Params) => Promise<string | boolean>
}

export namespace ResetUserPassword {
  export type Params = {
    email: string
    code: string
    password: string
  }
}