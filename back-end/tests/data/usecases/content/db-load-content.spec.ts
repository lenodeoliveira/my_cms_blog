import { LoadContentRepositorySpy, makeFakeContent } from '@/tests/data/mocks/mock-db-content'
import { throwError } from '@/tests/domain/test-helpers'
import { DbLoadContent } from '@/data/usecases/content/db-load-content'
import MockDate from 'mockdate'

type SutType = {
  sut: DbLoadContent
  loadContentRepositorySpy: LoadContentRepositorySpy
}

const makeSut = (): SutType => {
    const loadContentRepositorySpy = new LoadContentRepositorySpy()
    const sut = new DbLoadContent(loadContentRepositorySpy)
    return {
        sut,
        loadContentRepositorySpy
    }
}

describe('DbLoadContent Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })


    test('Should call LoadOne content', async () => {
        const { sut } = makeSut()
        const loadOneSpy = jest.spyOn(sut, 'loadOne')
        const slug = 'any_slug'
        await sut.loadOne(slug)
        expect(loadOneSpy).toHaveBeenCalledWith(slug)
    })

    test('Should call LoadContentRepositorySpy', async () => {
        const { sut, loadContentRepositorySpy } = makeSut()
        const loadOneSpy = jest.spyOn(loadContentRepositorySpy, 'findOneContent')
        const slug = 'any_slug'
        await sut.loadOne(slug)
        expect(loadOneSpy).toHaveBeenCalledWith(slug)
    })

    test('Should return a content', async () => {
        const { sut, loadContentRepositorySpy } = makeSut()
        await sut.loadOne('any_slug')
        expect(loadContentRepositorySpy.result).toEqual(makeFakeContent())
    })

    test('Should throw if LoadContentRepository throws', async () => {
        const { sut, loadContentRepositorySpy } = makeSut()
        jest.spyOn(loadContentRepositorySpy, 'findOneContent').mockImplementationOnce(throwError)
        const promise = sut.loadOne('any_slug')
        await expect(promise).rejects.toThrow()
    })
})