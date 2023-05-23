import { throwError } from '@/tests/domain/test-helpers'
import { DbLoadContentByAdmin } from '@/data/usecases/content/db-load-content-by-admin'
import { LoadContentByAdminRepositorySpy } from '@/tests/data/mocks/mock-db-content'


type SutTypes = {
  sut: DbLoadContentByAdmin
  loadContentByAdminRepository: LoadContentByAdminRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadContentByAdminRepository = new LoadContentByAdminRepositorySpy()
    const sut = new DbLoadContentByAdmin(loadContentByAdminRepository)
  
    return {
        sut,
        loadContentByAdminRepository
    }
}

describe('DbLoadContentByAdmin UseCase', () => {
    test('Should call LoadContentByAdminRepository with correct values', async () => {
        const { sut, loadContentByAdminRepository } = makeSut()
        await sut.loadOneContent('any_id')
        expect(loadContentByAdminRepository.id).toBe('any_id')
    })

    test('Should return the an content', async () => {
        const { sut, loadContentByAdminRepository } = makeSut()
        const content = await sut.loadOneContent('any_id')
        expect(content).toEqual(loadContentByAdminRepository.result)
    })

    test('Should return null if there is no content', async () => {
        const { sut, loadContentByAdminRepository } = makeSut()
        loadContentByAdminRepository.result = null
        const content = await sut.loadOneContent('any_id')
        expect(content).toBeNull()
    })

    test('Should throw if LoadContentByAdminRepository throws', async () => {
        const { sut, loadContentByAdminRepository } = makeSut()
        jest.spyOn(loadContentByAdminRepository, 'loadContentByAdmin').mockImplementationOnce(throwError)
        const promise = sut.loadOneContent('any_id')
        await expect(promise).rejects.toThrow()
    })
})