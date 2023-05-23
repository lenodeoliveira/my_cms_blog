import { LoadContentsController } from '@/presentation/controller/contents/load-contents-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { throwError } from '@/tests/domain/test-helpers'
import { LoadContentsSpy } from '@/tests/presentation/mocks/mock-content'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadContentsController
  loadContentsSpy: LoadContentsSpy
}

const makeFakeRequest = (): LoadContentsController.Request => ({
    page: 1,
    limit: 2,
})

const makeSut = (): SutTypes => {
    const loadContentsSpy = new LoadContentsSpy()
    const sut = new LoadContentsController(loadContentsSpy)
    return {
        sut,
        loadContentsSpy
    }
}


describe('LoadContents Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadContents with correct values', async () => {
        const { sut, loadContentsSpy } = makeSut()
        await sut.handle(makeFakeRequest())
        expect(loadContentsSpy.params).toEqual(makeFakeRequest())
    })

    test('Should return 200 on success', async () => {
        const { sut, loadContentsSpy } = makeSut()
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(ok(loadContentsSpy.result))
    })

    test('Should return 204 if LoadContents returns null', async () => {
        const { sut, loadContentsSpy } = makeSut()
        loadContentsSpy.result = null
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if LoadContents throws', async () => {
        const { sut, loadContentsSpy } = makeSut()
        jest.spyOn(loadContentsSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})