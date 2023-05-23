import { Validation } from '@/presentation/protocols/validation'

export class FileValidation implements Validation {

    validate (input: any): Error {
        const maxSize =  2 * 1024 * 1024
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg'
        ]
        if (input?.size > maxSize) {
            return new Error('Invalid size')
        }
        if (!allowedMimes.includes(input?.mime)) {
            return new Error('Invalid type, allowed types: jpeg, pjpeg, png, jpg')
        }
    }


}
