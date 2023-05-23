import { UsersByAdminController } from '@/presentation/controller/users/user-by-admin-controller'
import { FindUserByAdminSpy } from '@/tests/presentation/mocks/mock-users'
import { throwError } from '@/tests/domain/test-helpers'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import MockDate from 'mockdate'


type SutTypes = {
  sut: UsersByAdminController
  findUserByAdminSpy: FindUserByAdminSpy
}

const makeSut = (): SutTypes => {
    const findUserByAdminSpy = new FindUserByAdminSpy()
    const sut = new UsersByAdminController(findUserByAdminSpy)
    return {
        sut,
        findUserByAdminSpy
    }
}

describe('UserbyAdminController', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should return 200 on success', async () => {
        const { sut, findUserByAdminSpy } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(findUserByAdminSpy.result))
    })

    test('Should call FindUserByAdmin the correct values', async () => {
        const { sut, findUserByAdminSpy } = makeSut()
        const retrieveUsersSpy = jest.spyOn(findUserByAdminSpy, 'findUsers')
        await sut.handle({ page: 1, limit: 1 })
        expect(retrieveUsersSpy).toHaveBeenCalledWith({ page: 1, limit: 1 })
    })

    test('Should return 204 if no user exists', async () => {
        const { sut, findUserByAdminSpy } = makeSut()
        findUserByAdminSpy.result = null
        const httpResponse = await sut.handle({ page: 1, limit: 1 })
        expect(httpResponse).toEqual(noContent())
    })

    test('Should 500 if FindUserByAdmin throws', async () => {
        const { sut, findUserByAdminSpy } = makeSut()
        jest.spyOn(findUserByAdminSpy, 'findUsers').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({ page: 1, limit: 1 })
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
