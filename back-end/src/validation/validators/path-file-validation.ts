import { Validation } from '@/presentation/protocols/validation'
import { NotFoundError } from '@/presentation/errors/not-found-error'
import path from 'path'
import fs from 'fs'

export class PathFileValidation implements Validation {

    validate (input: any): Error {
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'static', input))) {
            return new NotFoundError('File not found')
        }
    }
}

