import { RegisterUserByAdminSpy } from '@/tests/presentation/mocks/mock-users'
import { RegisterUserByAdminController } from '@/presentation/controller/users/register-users-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { throwError } from '@/tests/domain/test-helpers'
import { ServerError, MissingParamError, EmailInUseError } from '@/presentation/errors/'
import { serverError, badRequest, forbidden, noContent } from '@/presentation/helpers/http/http-helpers'



const mockRequest = (): RegisterUserByAdminController.Request => ({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    status: 1,
    role: 'any_role'
})

type SutTypes = {
  sut: RegisterUserByAdminController
  registerUserSpy: RegisterUserByAdminSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const registerUserSpy = new RegisterUserByAdminSpy()
    const validationSpy = new ValidationSpy()
    const sut = new RegisterUserByAdminController(registerUserSpy, validationSpy)
    return {
        sut,
        registerUserSpy,
        validationSpy
    }
}

describe('RegisterUserByAdmin Controller', () => {
    test('Should call RegisterUserByAdmin the correct values', async () => {
        const { sut, registerUserSpy } = makeSut()
        const registerSpy = jest.spyOn(registerUserSpy, 'register')
        await sut.handle(mockRequest())
        expect(registerSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_mail@mail.com',
            password: 'any_password',
            status: 1,
            role: 'any_role'
        })
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })

    test('Should return 403 if email is already in use', async () => {
        const { sut, registerUserSpy } = makeSut()
        jest.spyOn(registerUserSpy, 'register').mockReturnValueOnce(Promise.resolve(false))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })

    test('Should 500 if RegisterUserByAdmin throws', async () => {
        const { sut, registerUserSpy } = makeSut()
        jest.spyOn(registerUserSpy, 'register').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should be possible to add a user successfully', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(noContent())
    })
})
