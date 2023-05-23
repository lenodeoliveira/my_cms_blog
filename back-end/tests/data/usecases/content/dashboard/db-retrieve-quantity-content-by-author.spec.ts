import { throwError } from '@/tests/domain/test-helpers'
import { DbRetrieveQuantityContentByAuthor } from '@/data/usecases/content/dashboard/db-retrieve-quantity-content-by-author'
import { RetrieveQuantityContentByAuthorRepositorySpy } from '@/tests/data/mocks/mock-db-content'


type SutTypes = {
    sut: DbRetrieveQuantityContentByAuthor,
    retrieveQuantityContentByAuthorRepositorySpy: RetrieveQuantityContentByAuthorRepositorySpy
}

const makeSut = (): SutTypes => {
    const retrieveQuantityContentByAuthorRepositorySpy = new RetrieveQuantityContentByAuthorRepositorySpy()
    const sut = new DbRetrieveQuantityContentByAuthor(retrieveQuantityContentByAuthorRepositorySpy)
    return {
        sut,
        retrieveQuantityContentByAuthorRepositorySpy
    }
}

describe('DbRetrieveQuantityContentByAuthor Usecase', () => {
    test('Should call RetrieveQuantityContentByAuthor', async () => {
        const { sut, retrieveQuantityContentByAuthorRepositorySpy } = makeSut()
        jest.spyOn(retrieveQuantityContentByAuthorRepositorySpy, 'retrieveContents')
        await sut.retrieveContents()
        expect(retrieveQuantityContentByAuthorRepositorySpy.retrieveContents).toHaveBeenCalledTimes(1)
    })

    test('Should return the contents', async () => {
        const { sut, retrieveQuantityContentByAuthorRepositorySpy } = makeSut()
        const contents = await sut.retrieveContents()
        expect(contents).toEqual(retrieveQuantityContentByAuthorRepositorySpy.result)
    })

    test('Should return null if there is no content', async () => {
        const { sut, retrieveQuantityContentByAuthorRepositorySpy } = makeSut()
        retrieveQuantityContentByAuthorRepositorySpy.result = null
        const contents = await sut.retrieveContents()
        expect(contents).toBeNull()
    })

    test('Should throw if LoadContentsByAdminRepository throws', async () => {
        const { sut, retrieveQuantityContentByAuthorRepositorySpy } = makeSut()
        jest.spyOn(retrieveQuantityContentByAuthorRepositorySpy, 'retrieveContents').mockImplementationOnce(throwError)
        const promise = sut.retrieveContents()
        await expect(promise).rejects.toThrow()
    })
})

