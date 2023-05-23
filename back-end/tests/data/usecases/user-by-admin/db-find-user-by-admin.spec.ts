import { DbFindUsersByAdmin } from '@/data/usecases/user-by-admin/db-find-users-by-admin'
import { FindUserByAdminRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/test-helpers'

type SutTypes = {
  sut: DbFindUsersByAdmin
  findUserByAdminRepositorySpy: FindUserByAdminRepositorySpy
}

const makeSut = (): SutTypes => {
    const findUserByAdminRepositorySpy = new FindUserByAdminRepositorySpy()
    const sut = new DbFindUsersByAdmin(findUserByAdminRepositorySpy)
    return {
        sut,
        findUserByAdminRepositorySpy
    }
}

describe('DbFindUsersByAdmin Usecase', () => {
    test('Should call DbFindUsersByAdmin with correct values', async () => {
        const { sut, findUserByAdminRepositorySpy } = makeSut()
        await sut.findUsers({ page: 2, limit: 2 })
        expect(findUserByAdminRepositorySpy.params).toEqual({ page: 2, limit: 2 })
    })

    test('Should throw if DbFindUsersByAdmin throws', async () => {
        const { sut, findUserByAdminRepositorySpy } = makeSut()
        jest.spyOn(findUserByAdminRepositorySpy, 'findUsers').mockImplementationOnce(throwError)
        const promise = sut.findUsers({ page: 2, limit: 2 })
        expect(promise).rejects.toThrow()  
    })

    test('Should retrieve users', async () => {
        const { sut, findUserByAdminRepositorySpy } = makeSut()
        const users = await sut.findUsers({})
        expect(users).toEqual(findUserByAdminRepositorySpy.result)
    })
})