import { throwError } from '@/tests/domain/test-helpers'
import { RetrieveUserByAdminController } from '@/presentation/controller/users/retrieve-user-by-admin-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { RetrieveUserByAdminSpy } from '@/tests/presentation/mocks/mock-account'
import MockDate from 'mockdate'

type SutTypes = {
  sut: RetrieveUserByAdminController
  retrieveUserByAdminSpy: RetrieveUserByAdminSpy
}

const makeSut = (): SutTypes => {
    const retrieveUserByAdminSpy = new RetrieveUserByAdminSpy()
    const sut = new RetrieveUserByAdminController(retrieveUserByAdminSpy)
    return {
        sut,
        retrieveUserByAdminSpy
    }
}

describe('RetrieveUserByAdmin Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call RetrieveUserByAdmin the correct values', async () => {
        const { sut, retrieveUserByAdminSpy } = makeSut()
        const retrieveUserSpy = jest.spyOn(retrieveUserByAdminSpy, 'retrieveUser')
        await sut.handle({ id: 'any_id' })
        expect(retrieveUserSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should return 204 if RetrieveUserByAdmin returns null', async () => {
        const { sut, retrieveUserByAdminSpy } = makeSut()
        retrieveUserByAdminSpy.result = null
        const httpResponse = await sut.handle({ id: 'any_id' })
        expect(httpResponse).toEqual(noContent())
    })

    test('Should be possible to return a user successfully', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({ id: 'any_id' })
        expect(httpResponse).toEqual(ok({
            id: 'any_id',
            name: 'any_name',
            email: 'any_mail@gmail.com',
            status: 1,
            role: 'any_role',
            createdAt: new Date(),
            updatedAt: new Date()
        }))
    })

    test('Should return 500 if RetrieveUserByAdmin throws', async () => {
        const { sut, retrieveUserByAdminSpy } = makeSut()
        jest.spyOn(retrieveUserByAdminSpy, 'retrieveUser').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({id: 'any_id'})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
