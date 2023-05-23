export interface RetrieveUserByAdminRepository {
  retrieveUser: (id: string) => Promise<RetrieveUserByAdminRepository.Result>
}

export namespace RetrieveUserByAdminRepository {
 export type Result = {
    id: string
    name: string
    email: string
    status: number
    role: string
    createdAt: Date
    updatedAt: Date
 }
}
