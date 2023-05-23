import { throwError } from '@/tests/domain/test-helpers'
import { LoadContentByAdminController } from '@/presentation/controller/contents/load-content-by-admin-controller'
import { noContent, serverError, ok } from '@/presentation/helpers/http/http-helpers'
import { LoadContentByAdminSpy } from '@/tests/presentation/mocks/mock-content'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadContentByAdminController
  loadContentByAdminSpy: LoadContentByAdminSpy
}

const makeSut = (): SutTypes => {
    const loadContentByAdminSpy = new LoadContentByAdminSpy()
    const sut = new LoadContentByAdminController(loadContentByAdminSpy)

    return {
        sut,
        loadContentByAdminSpy,
    }
}

describe('LoadContentByAdmin Controller', () => {

    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadContentByAdmin with correct values', async () => {
        const { sut, loadContentByAdminSpy } = makeSut()
        await sut.handle({id: 'any_id'})
        expect(loadContentByAdminSpy.id).toBe('any_id')
    })

    test('Should return status code 204 if no content exists', async () => {
        const { sut, loadContentByAdminSpy } = makeSut()
        loadContentByAdminSpy.result = null
        const httpResponse = await sut.handle({id: 'any_id'})
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if LoadContentByAdmin throws', async () => {
        const { sut, loadContentByAdminSpy } = makeSut()
        jest.spyOn(loadContentByAdminSpy, 'loadOneContent').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({id: 'any_id'})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut, loadContentByAdminSpy } = makeSut()
        const httpResponse = await sut.handle({id: 'any_id'})
        expect(httpResponse).toEqual(ok(loadContentByAdminSpy.result))
    })
})