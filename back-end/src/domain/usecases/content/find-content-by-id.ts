export interface FindContentById {
  findContent: (id: string) => Promise<boolean>
}