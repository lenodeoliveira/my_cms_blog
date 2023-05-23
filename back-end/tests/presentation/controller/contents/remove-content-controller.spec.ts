import { RemoveContentSpy } from '@/tests/presentation/mocks/mock-content'
import { RemoveContentController } from '@/presentation/controller/contents/remove-content-controller'
import { throwError } from '@/tests/domain/test-helpers'
import { noContent, notFound, serverError } from '@/presentation/helpers/http/http-helpers'

type SutTypes = {
  sut: RemoveContentController
  removeContentSpy: RemoveContentSpy
}

const makeFakeRequest = (): RemoveContentController.Result => ({
    id: 'any_id'
})

const makeSut = (): SutTypes => {
    const removeContentSpy = new RemoveContentSpy()
    const sut = new RemoveContentController(removeContentSpy)
    return {
        sut,
        removeContentSpy
    }
}

describe('RemoveContent Controller', () => {
    test('Should call RemoveContent with correct values', async () => {
        const { sut, removeContentSpy } = makeSut()
        const request = makeFakeRequest()
        await sut.handle(request)
        expect(removeContentSpy.id).toEqual(request.id)
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(noContent())
    })

    test('Should return the status code 404, if the content does not exist', async () => {
        const { sut, removeContentSpy } = makeSut()
        removeContentSpy.result = false
        const request = makeFakeRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(notFound(new Error('content not exists')))
    })

    test('Should return 500 if RemoveContent throws', async () => {
        const { sut, removeContentSpy } = makeSut()
        jest.spyOn(removeContentSpy, 'removeContent').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})