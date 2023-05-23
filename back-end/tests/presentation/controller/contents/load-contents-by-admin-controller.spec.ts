import { throwError } from '@/../tests/domain/test-helpers'
import { LoadContentsByAdminController } from '@/presentation/controller/contents/load-contents-by-admin-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { LoadContentsByAdminSpy } from '@/tests/presentation/mocks/mock-content'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadContentsByAdminController
  loadContentsByAdminSpy: LoadContentsByAdminSpy
}

const makeSut = (): SutTypes => {
    const loadContentsByAdminSpy = new LoadContentsByAdminSpy()
    const sut = new LoadContentsByAdminController(loadContentsByAdminSpy)
    return {
        sut,
        loadContentsByAdminSpy
    }
}

describe('LoadContentsByAdmin Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadContentsByAdmin with correct values', async () => {
        const { sut, loadContentsByAdminSpy } = makeSut()
        await sut.handle({
            page: 1,
            limit: 1
        })
        expect(loadContentsByAdminSpy.params).toEqual({  page: 1, limit: 1 })
    })

    test('Should return 204 if LoadContentsByAdmin returns null', async () => {
        const { sut, loadContentsByAdminSpy } = makeSut()
        loadContentsByAdminSpy.result = null
        const httpResponse = await sut.handle({ page: 1, limit: 1 })
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 200 on success', async () => {
        const { sut, loadContentsByAdminSpy } = makeSut()
        const httpResponse = await sut.handle({ page: 1, limit: 1 })
        expect(httpResponse).toEqual(ok(loadContentsByAdminSpy.result))
    })

    test('Should return 500 if LoadContentsByAdmin throws', async () => {
        const { sut, loadContentsByAdminSpy } = makeSut()
        jest.spyOn(loadContentsByAdminSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({page: 1, limit: 1}) 
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})