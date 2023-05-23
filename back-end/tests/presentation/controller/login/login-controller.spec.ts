import { AuthenticationSpy } from '@/tests/presentation/mocks/mock-account'
import { LoginController } from '@/presentation/controller/login/login-controller'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helpers'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { MissingParamError } from '@/presentation/errors/'
import { badRequest } from '@/presentation/helpers/http/http-helpers'
import { throwError } from '@/tests/domain/test-helpers'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
  sut: LoginController
}

const mockFakeRequest = (): LoginController.Request => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})


const makeSut = (): SutTypes =>{
    const authenticationSpy = new AuthenticationSpy()
    const validationSpy = new ValidationSpy()
    const sut = new LoginController( validationSpy, authenticationSpy)
    return {
        sut, 
        authenticationSpy,
        validationSpy
    }
}

describe('Login Controller', () => {
    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut()
        const authSpy = jest.spyOn(authenticationSpy, 'auth')
        await sut.handle(mockFakeRequest())
        expect(authSpy).toHaveBeenCalledWith({
            email: 'any_email@mail.com',
            password: 'any_password'
        })
    })

    test('Should return an error when authentication is not possible', async () => {
        const { sut, authenticationSpy } = makeSut()
        authenticationSpy.result = null
        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockFakeRequest()
        validationSpy.input = request
        await sut.handle(mockFakeRequest())
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new MissingParamError('any_error')
        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationSpy } = makeSut()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.resolve(null))

        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authenticationSpy } = makeSut()
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut, authenticationSpy } = makeSut()
        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(ok(authenticationSpy.result))
    })

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = makeSut()
  
        const httpResponse = await sut.handle(mockFakeRequest())
        expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
    })
})