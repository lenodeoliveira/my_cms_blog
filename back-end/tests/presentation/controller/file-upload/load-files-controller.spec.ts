import { LoadFilesController } from '@/presentation/controller/file-upload/load-files-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { throwError } from '@/tests/domain/test-helpers'
import { LoadFilesSpy } from '@/tests/presentation/mocks/mock-files'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadFilesController
  loadFilesSpy: LoadFilesSpy
}

const makeFakeRequest = (): LoadFilesController.Request => ({
    page: 1,
    limit: 2,
    orderBy: 'name',
    orientation: 'desc'
})

const makeSut = (): SutTypes => {
    const loadFilesSpy = new LoadFilesSpy()
    const sut = new LoadFilesController(loadFilesSpy)
    return {
        sut,
        loadFilesSpy
    }
}


describe('LoadFiles Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadFiles with correct values', async () => {
        const { sut, loadFilesSpy } = makeSut()
        await sut.handle(makeFakeRequest())
        expect(loadFilesSpy.params).toEqual(makeFakeRequest())
    })

    test('Should return 200 on success', async () => {
        const { sut, loadFilesSpy } = makeSut()
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(ok(loadFilesSpy.result))
    })

    test('Should return 204 if LoadFiles returns null', async () => {
        const { sut, loadFilesSpy } = makeSut()
        loadFilesSpy.result = null
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if LoadFiles throws', async () => {
        const { sut, loadFilesSpy } = makeSut()
        jest.spyOn(loadFilesSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})