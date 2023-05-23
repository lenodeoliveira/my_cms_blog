import { ResetUserPasswordSpy } from '@/tests/presentation/mocks/mock-reset-password'
import { ResetPasswordController } from '@/presentation/controller/reset-password/reset-password-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { badRequest, forbidden, noContent, notFound } from '@/presentation/helpers/http/http-helpers'
import { MissingParamError, TokenExpiredError, TokenInvalidError } from '@/presentation/errors'

type SutType = {
  sut: ResetPasswordController
  validationSpy: ValidationSpy
  resetUserPasswordSpy: ResetUserPasswordSpy
}

const makeSut = (): SutType => {
    const resetUserPasswordSpy = new ResetUserPasswordSpy()
    const validationSpy = new ValidationSpy()
    const sut = new ResetPasswordController(resetUserPasswordSpy, validationSpy)

    return {
        sut, 
        resetUserPasswordSpy,
        validationSpy
    }
}

const mockRequest = (): ResetPasswordController.Request => ({
    email: 'any_mail@mail.com',
    code: 'any_code',
    password: 'any_password',
    passwordConfirmation: 'any_password'
}) 

describe('ResetPasswordController', () => {
    test('Should call ResetUserPassword the correct values', async () => {
        const { sut, resetUserPasswordSpy } = makeSut()
        const resetPasswordSpy = jest.spyOn(resetUserPasswordSpy, 'resetPassword')
        await sut.handle(mockRequest())
        expect(resetPasswordSpy).toHaveBeenCalledWith({
            email: 'any_mail@mail.com',
            code: 'any_code',
            password: 'any_password',
        })
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })

    test('Should return 403 if ResetUserPassword returns an error', async () => {
        const { sut, resetUserPasswordSpy } = makeSut()
        resetUserPasswordSpy.result = false
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(notFound(new Error('User does not exists!')))
    })

    test('Should return 403 if the token has expired', async () => {
        const { sut, resetUserPasswordSpy } = makeSut()
        jest.spyOn(resetUserPasswordSpy, 'resetPassword').mockReturnValueOnce(Promise.resolve('expired'))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new TokenExpiredError()))
    })

    test('Should return 403 if the token is invalid', async () => {
        const { sut, resetUserPasswordSpy } = makeSut()
        jest.spyOn(resetUserPasswordSpy, 'resetPassword').mockReturnValueOnce(Promise.resolve('invalid'))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new TokenInvalidError()))
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpRequest = await sut.handle(mockRequest())
        expect(httpRequest).toEqual(noContent())
    })
})
