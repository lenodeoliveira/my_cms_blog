import {ForgotPasswordController} from '@/presentation/controller/forgot-password/forgot-password-controller'
import {ForgotPasswordSpy} from '@/tests/presentation/mocks/mock-forgot-password'
import {ValidationSpy} from '@/tests/presentation/mocks/mock-validation'
import {badRequest, noContent, notFound} from '@/presentation/helpers/http/http-helpers'

type SutTypes = {
  sut: ForgotPasswordController
  forgotPasswordSpy: ForgotPasswordSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const forgotPasswordSpy = new ForgotPasswordSpy()
    const validationSpy = new ValidationSpy()
    const sut = new ForgotPasswordController(forgotPasswordSpy, validationSpy)
  
    return {
        sut,
        forgotPasswordSpy,
        validationSpy
    }
}

describe('ForgotPassWordController', () => {
    test('Should call ForgotPassword with correct values', async () => {
        const { sut, forgotPasswordSpy } = makeSut()
        await sut.handle({email: 'any_mail@mail.com', host: 'any_host'})
        expect(forgotPasswordSpy.email).toEqual('any_mail@mail.com')
        expect(forgotPasswordSpy.host).toEqual('any_host')
    })

    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        await sut.handle({email: 'any_mail@mail.com'})
        expect(validationSpy.input).toEqual({email: 'any_mail@mail.com'})
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle({email: 'any_mail@mail.com'})
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

    test('Should return 404 if user not exists', async () => {
        const { sut, forgotPasswordSpy } = makeSut()
        forgotPasswordSpy.result = null
        const httpResponse = await sut.handle({email: 'any_mail@mail.com'})
        expect(httpResponse).toEqual(notFound(new Error('User does not exist')))
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({email: 'any_mail@mail.com'})
        expect(httpResponse).toEqual(noContent())
    })
})