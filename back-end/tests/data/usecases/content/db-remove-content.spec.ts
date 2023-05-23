import { RemoveContentRepositorySpy } from '@/tests/data/mocks/mock-db-content'
import { DbRemoveContent } from '@/data/usecases/content/db-remove-content'
import { throwError } from '@/tests/domain/test-helpers'


type SutTypes = {
  sut: DbRemoveContent
  removeContentRepositorySpy: RemoveContentRepositorySpy
}

const makeSut = (): SutTypes => {
    const removeContentRepositorySpy = new RemoveContentRepositorySpy()
    const sut = new DbRemoveContent(removeContentRepositorySpy)

    return {
        sut,
        removeContentRepositorySpy
    }
}

describe('RemoveContentRepository usecase', () => {
    test('Should call Remove with correct value', async () => {
        const { sut, removeContentRepositorySpy } = makeSut()
        const id = 'any_id'
        await sut.removeContent(id)
        expect(removeContentRepositorySpy.id).toEqual(id)
    })

    test('Should return true if it is possible to remove content', async () => {
        const { sut, removeContentRepositorySpy } = makeSut()
        const id = 'any_id'
        await sut.removeContent(id)
        expect(removeContentRepositorySpy.result).toBeTruthy()
    })

    test('Should throw if RemoveContentRepository throws', async () => {
        const { sut, removeContentRepositorySpy } = makeSut()
        jest.spyOn(removeContentRepositorySpy, 'remove').mockImplementationOnce(throwError)
        const promise = sut.removeContent('any_id')
        await expect(promise).rejects.toThrow()
    })
})