export interface RemoveContentRepository {
  remove: (id: string) => Promise<boolean>
}