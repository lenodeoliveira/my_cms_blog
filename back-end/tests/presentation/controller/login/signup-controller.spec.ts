import { AddAccountSpy } from '@/tests/presentation/mocks/mock-account'
import { SignUpController } from '@/presentation/controller/login/signup-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { throwError } from '@/tests/domain/test-helpers'
import { ServerError, MissingParamError, EmailInUseError } from '@/presentation/errors/'
import { serverError, badRequest, forbidden, noContent } from '@/presentation/helpers/http/http-helpers'



const mockRequest = (): SignUpController.Request => ({
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
})
type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
}
const makeSut = (): SutTypes => {
    const addAccountSpy = new AddAccountSpy()
    const validationSpy = new ValidationSpy()
    const sut = new SignUpController(addAccountSpy, validationSpy)
    return {
        sut,
        addAccountSpy,
        validationSpy
    }
}

describe('SignUp Controller', () => {
    test('Should call AddAccount the correct values', async () => {
        const { sut, addAccountSpy } = makeSut()
        const addSpy = jest.spyOn(addAccountSpy, 'add')
        await sut.handle(mockRequest())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_mail@mail.com',
            password: 'any_password'
        })
    })

    test('Should 500 if AddAccount throws', async () => {
        const { sut, addAccountSpy } = makeSut()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })

    test('Should return 403 if email is already in use', async () => {
        const { sut, addAccountSpy } = makeSut()
        jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.resolve(false))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })

    test('Should return 204 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(noContent())
    })
})