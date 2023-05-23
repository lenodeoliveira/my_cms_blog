import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

const field = 'any_field'

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({ invalidField: 'any_field' })
        expect(error).toEqual(new MissingParamError(field))
    })

    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({ [field]: 'any_field' })
        expect(error).toBeFalsy()
    })
})
