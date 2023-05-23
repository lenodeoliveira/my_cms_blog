import { RetrieveQuantityContentByAuthorSpy } from '@/tests/presentation/mocks/mock-content'
import { RetrieveQuantityContentByAuthorController } from '@/presentation/controller/dashboard/retrieve-quantity-content-by-author-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { throwError } from '@/tests/domain/test-helpers'

type SutTypes = {
  sut: RetrieveQuantityContentByAuthorController,
  retrieveQuantityContentByAuthorSpy: RetrieveQuantityContentByAuthorSpy
}


const makeSut = (): SutTypes => {
    const retrieveQuantityContentByAuthorSpy = new RetrieveQuantityContentByAuthorSpy()
    const sut = new RetrieveQuantityContentByAuthorController(retrieveQuantityContentByAuthorSpy)

    return {
        sut,
        retrieveQuantityContentByAuthorSpy
    }
}

describe('RetrieveQuantityContentByAuthor Controller', () => {
    test('Should call RetrieveQuantityContentByAuthor', async () => {
        const { sut, retrieveQuantityContentByAuthorSpy } = makeSut()
        jest.spyOn(retrieveQuantityContentByAuthorSpy, 'retrieveContents')
        await sut.handle({})
        expect(retrieveQuantityContentByAuthorSpy.retrieveContents).toHaveBeenCalledTimes(1)
    })

    test('Should return 204 if RetrieveQuantityContentByAuthor returns null', async () => {
        const { sut, retrieveQuantityContentByAuthorSpy } = makeSut()
        retrieveQuantityContentByAuthorSpy.result = null
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 200 on success', async () => {
        const { sut, retrieveQuantityContentByAuthorSpy } = makeSut()
        const httpRequest = await sut.handle({})
        expect(httpRequest).toEqual(ok(retrieveQuantityContentByAuthorSpy.result))
    })

    test('Should return 500 if RetrieveQuantityContentByAuthor throws', async () => {
        const { sut, retrieveQuantityContentByAuthorSpy } = makeSut()
        jest.spyOn(retrieveQuantityContentByAuthorSpy, 'retrieveContents').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})