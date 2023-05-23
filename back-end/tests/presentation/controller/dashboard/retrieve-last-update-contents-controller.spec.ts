import { RetrieveLastUpdateContentsSpy } from '@/tests/presentation/mocks/mock-content'
import { RetrieveLastUpdateContentsController } from '@/presentation/controller/dashboard/retrieve-last-update-contents-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { throwError } from '@/tests/domain/test-helpers'
import MockDate from 'mockdate'

type SutTypes = {
  sut: RetrieveLastUpdateContentsController,
  retrieveLastUpdateContentsSpy: RetrieveLastUpdateContentsSpy
}

const makeFakeRequest = (): RetrieveLastUpdateContentsController.Request => ({
    start: new Date('2022-10-01 21:22:48'),
    end: new Date ('2022-10-02 21:22:48')
})

const makeSut = (): SutTypes => {
    const retrieveLastUpdateContentsSpy = new RetrieveLastUpdateContentsSpy()
    const sut = new RetrieveLastUpdateContentsController(retrieveLastUpdateContentsSpy)

    return {
        sut,
        retrieveLastUpdateContentsSpy
    }
}

describe('RetrieveLastUpdateContentsController', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call RetrieveLastUpdateContents with correct values', async () => {
        const { sut, retrieveLastUpdateContentsSpy } = makeSut()
        await sut.handle(makeFakeRequest())
        expect(retrieveLastUpdateContentsSpy.params).toEqual(makeFakeRequest())
    })

    test('Should return 204 if RetrieveLastUpdateContents returns null', async () => {
        const { sut, retrieveLastUpdateContentsSpy } = makeSut()
        retrieveLastUpdateContentsSpy.result = null
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 200 on success', async () => {
        const { sut, retrieveLastUpdateContentsSpy } = makeSut()
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(ok(retrieveLastUpdateContentsSpy.result))
    })

    test('Should return 500 if RetrieveLastUpdateContents throws', async () => {
        const { sut, retrieveLastUpdateContentsSpy } = makeSut()
        jest.spyOn(retrieveLastUpdateContentsSpy, 'loadLastContents').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})