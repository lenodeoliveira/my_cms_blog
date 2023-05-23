export interface RetrieveUserByAdmin {
  retrieveUser: (id: string) => Promise<RetrieveUserByAdmin.Result>
}

export namespace RetrieveUserByAdmin {
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

