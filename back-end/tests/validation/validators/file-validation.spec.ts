import { FileValidation } from '@/validation/validators'

const makeSut = (): FileValidation => {
    return new FileValidation()
}

describe('FileValidation', () => {
    test('Should return an error if size validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            size: 89 * 1024 * 1024,
            mimetype: 'image/jpeg'
        })
        expect(error).toEqual(new Error('Invalid size'))
    })

    test('Should return an error if image type validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            size: 121234,
            mime: 'image/gif'
        })
        expect(error).toEqual(new Error('Invalid type, allowed types: jpeg, pjpeg, png, jpg'))
    })

    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({
            size: 1 * 1024 * 1024,
            mime: 'image/jpeg'
        })
        expect(error).toBeFalsy()
    })
})
