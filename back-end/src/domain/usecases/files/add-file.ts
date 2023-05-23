export interface AddFile {
  addFile: (file: AddFile.Params) => Promise<void>
}

export namespace AddFile {
  export type Params = {
    name: string
    ext: string
    url: string
    mime: string
    size: number
    folderPath: string,
    createdAtById: string,
    updatedById: string
  }
}
