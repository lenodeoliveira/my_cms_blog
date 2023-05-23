import { LoadFilesRepositorySpy } from '@/tests/data/mocks/mock-db-files'
import { DbLoadFile } from '@/data/usecases/files/db-load-files'
import { throwError } from '@/tests/domain/test-helpers'
import { mockLoadFiles } from '@/tests/domain/mock-files'
import MockDate from 'mockdate'

type SutType = {
  sut: DbLoadFile
  loadFilesRepositorySpy: LoadFilesRepositorySpy
}

const makeSut = (): SutType => {
    const loadFilesRepositorySpy = new LoadFilesRepositorySpy()
    const sut = new DbLoadFile(loadFilesRepositorySpy)
    return {
        sut,
        loadFilesRepositorySpy
    }
}

describe('DbLoadFiles Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should return a list of files', async () => {
        const { sut, loadFilesRepositorySpy } = makeSut()
        await sut.load({
            page: 1,
            limit: 2,
        })
        expect(loadFilesRepositorySpy.result).toEqual(mockLoadFiles())
    })

    test('Should call LoadFilesRepository', async () => {
        const { sut, loadFilesRepositorySpy } = makeSut()
        const loadSpy = jest.spyOn(loadFilesRepositorySpy, 'loadAll')
        const params = {
            page: 1,
            limit: 2,
        }
        await sut.load(params)
        expect(loadSpy).toHaveBeenCalledWith(params)
    })

    test('Should throw if LoadFilesRepository throws', async () => {
        const { sut, loadFilesRepositorySpy } = makeSut()
        jest.spyOn(loadFilesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
        const promise = sut.load({
            page: 1,
            limit: 2,
        })
        await expect(promise).rejects.toThrow()
    })
})