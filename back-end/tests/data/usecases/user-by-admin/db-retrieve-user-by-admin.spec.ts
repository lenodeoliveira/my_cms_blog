import { DbRetrieveUserByAdmin } from '@/data/usecases/user-by-admin/db-retrieve-user-by-admin'
import { RetrieveUserByAdminRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/test-helpers'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbRetrieveUserByAdmin
  retrieveUserByAdminRepositorySpy: RetrieveUserByAdminRepositorySpy
}

const makeSut = (): SutTypes => {
    const retrieveUserByAdminRepositorySpy = new RetrieveUserByAdminRepositorySpy()
    const sut = new DbRetrieveUserByAdmin(retrieveUserByAdminRepositorySpy)

    return {
        sut,
        retrieveUserByAdminRepositorySpy
    }
}


describe('DbRegisterUserByAdmin', () => {

    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call RetrieveUserByAdminRepository with correct value', async () => {
        const { sut, retrieveUserByAdminRepositorySpy } = makeSut()
        await sut.retrieveUser('any_id')
        expect(retrieveUserByAdminRepositorySpy.id).toEqual('any_id')
    })

    test('Should throw if RetrieveUserByAdminRepository throws', async () => {
        const { sut, retrieveUserByAdminRepositorySpy } = makeSut()
        jest.spyOn(retrieveUserByAdminRepositorySpy, 'retrieveUser').mockImplementationOnce(throwError)
        const promise = sut.retrieveUser('any_id')
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if no user exists', async () => {
        const { sut, retrieveUserByAdminRepositorySpy } = makeSut()
        retrieveUserByAdminRepositorySpy.result = null
        const user = await sut.retrieveUser('any_id')
        expect(user).toBeNull()

    })

    test('Should return a user successfully', async () => {
        const { sut } = makeSut()
        const user = await sut.retrieveUser('any_id')
        expect(user).toEqual({
            id: 'any_id',
            name: 'any_name',
            email: 'any_mail@gmail.com',
            status: 1,
            role: 'any_role',
            createdAt: new Date(),
            updatedAt: new Date()
        })
    })
})