import { PathFileValidation } from '@/validation/validators'
import fs from 'fs'

const makeSut = (): PathFileValidation => {
    return new PathFileValidation()
}

jest.mock('fs', () => ({
    existsSync (): boolean {
        return true
    }
}))


describe('PathFileValidation', () => {
    test('Should return false if path does not exist', () => {
        const sut = makeSut()
        jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false)
        const error = sut.validate('wrong_path')
        expect(error).toEqual(new Error('File not found'))
    })

    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate('any_path')
        expect(error).toBeFalsy()
    })
})
