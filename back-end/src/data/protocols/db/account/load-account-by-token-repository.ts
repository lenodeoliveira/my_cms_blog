
export interface LoadAccountByTokenRepository {
  loadByToken: (id: string, status: number, role?: string) => Promise<LoadAccountByTokenRepository.Result>
}
export namespace LoadAccountByTokenRepository {
  export type Result = {
    id: string
    name: string
    email: string
  }
}
