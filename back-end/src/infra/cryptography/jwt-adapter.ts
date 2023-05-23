import { Encrypter, Decrypter } from '@/data/protocols/cryptography'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor (private readonly secret: string) {}

    async encrypt (plaintext: string): Promise<string> {
 
        return jwt.sign({ id: plaintext }, this.secret, {
            expiresIn: '2 days',
        })
    }

    async decrypt (ciphertext: string): Promise<Decrypter.Result> {
        return jwt.verify(ciphertext, this.secret) as any
    }
}


