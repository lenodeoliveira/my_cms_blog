import { Hasher, HashComparer, Encrypter, Decrypter } from '@/data/protocols/cryptography'

export class HasherSpy implements Hasher {
    digest = 'any'
    plaintext: string

    async hash (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
    }
}

export class HashComparerSpy implements HashComparer {
    plaintext: string
    digest: string
    isValid = true

    async compare (plaintext: string, digest: string): Promise<boolean> {
        this.plaintext = plaintext
        this.digest = digest
        return this.isValid
    }
}

export class EncrypterSpy implements Encrypter {
    ciphertext = 'any'
    plaintext: string

    async encrypt (plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.ciphertext
    }
}

export class DecrypterSpy implements Decrypter {
    plaintext = {
        id: 'any'
    }
    ciphertext: string

    async decrypt (ciphertext: string): Promise<Decrypter.Result> {
        this.ciphertext = ciphertext
        return this.plaintext
    }
}