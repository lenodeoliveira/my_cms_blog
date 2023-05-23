export interface LoadAccountByByIdRepository {
  loadById: (id: string) => Promise<LoadAccountByByIdRepository.Result>
}

export namespace LoadAccountByByIdRepository {
  export type Result = {
    id: string
    name: string
    email: string
    role: string
    status: number
  }
}
