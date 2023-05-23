import { UpdateUserByAdminSpy } from '@/tests/presentation/mocks/mock-users'
import { UpdateUserByAdminController } from '@/presentation/controller/users/update-users-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { throwError } from '@/tests/domain/test-helpers'
import { ServerError, MissingParamError } from '@/presentation/errors/'
import { serverError, badRequest, noContent, notFound } from '@/presentation/helpers/http/http-helpers'



type SutTypes = {
  sut: UpdateUserByAdminController
  updateUserSpy: UpdateUserByAdminSpy
  validationSpy: ValidationSpy
}

const mockRequest = (): any => ({
    id: 'any_id',
    name: 'any_name',
    status: 1,
    role: 'any_role'
})

const makeSut = (): SutTypes => {
    const updateUserSpy = new UpdateUserByAdminSpy()
    const validationSpy = new ValidationSpy()
    const sut = new UpdateUserByAdminController(updateUserSpy, validationSpy)
    return {
        sut,
        updateUserSpy,
        validationSpy
    }
}


describe('UpdateUserByAdmin Controller', () => {
    test('Should call UpdateUserByAdmin the correct values', async () => {
        const { sut, updateUserSpy } = makeSut()
        const updateSpy = jest.spyOn(updateUserSpy, 'updateUserByAdmin')
        await sut.handle(mockRequest())
        expect(updateSpy).toHaveBeenCalledWith({
            id: 'any_id',
            name: 'any_name',
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

    test('Should 500 if UpdateUserByAdmin throws', async () => {
        const { sut, updateUserSpy } = makeSut()
        jest.spyOn(updateUserSpy, 'updateUserByAdmin').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should return the status code 404, if the user does not exist', async () => {
        const { sut, updateUserSpy } = makeSut()
        updateUserSpy.result = false
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(notFound(new Error('User not exists')))
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpRequest = await sut.handle(mockRequest())
        expect(httpRequest).toEqual(noContent())
    })
})