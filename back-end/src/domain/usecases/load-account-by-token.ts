export interface LoadAccountByToken {
  load: (accessToken: string, status: number, role?: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string
  }
}
