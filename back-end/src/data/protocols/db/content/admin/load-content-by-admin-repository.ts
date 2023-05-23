import { LoadContentByAdmin } from '@/domain/usecases/content/load-content-by-admin'

export interface LoadContentByAdminRepository {
  loadContentByAdmin: (id: string) => Promise<LoadContentByAdminRepository.Result>
}

export namespace LoadContentByAdminRepository {
  export type Result = LoadContentByAdmin.Result | boolean
}