export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<Decrypter.Result>
}

export namespace Decrypter {
  export type Result = {
    id: string
  }
}