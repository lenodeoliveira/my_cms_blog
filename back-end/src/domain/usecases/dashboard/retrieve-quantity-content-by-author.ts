export interface RetrieveQuantityContentByAuthor {
  retrieveContents: () => Promise<RetrieveQuantityContentByAuthor.Result>
}

export namespace RetrieveQuantityContentByAuthor {
  export type Result = [{
    quantity: number
    authors: string
  }]
}
