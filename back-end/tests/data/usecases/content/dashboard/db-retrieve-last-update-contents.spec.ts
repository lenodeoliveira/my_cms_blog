import { throwError } from '@/tests/domain/test-helpers'
import { DbRetrieveLastUpdateContents } from '@/data/usecases/content/dashboard/db-retrieve-last-update-contents'
import { RetrieveLastUpdateContentsRepositorySpy } from '@/tests/data/mocks/mock-db-content'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'
import MockDate from 'mockdate'


type SutTypes = {
    sut: DbRetrieveLastUpdateContents,
    retrieveLastUpdateContentsRepositorySpy: RetrieveLastUpdateContentsRepositorySpy
}

const makeFakeRequest = (): RetrieveLastUpdateContents.Params => ({
    start: new Date('2022-10-01 21:22:48'),
    end: new Date ('2022-10-02 21:22:48'),
    page: 1, 
    limit: 1
})

const makeSut = (): SutTypes => {
    const retrieveLastUpdateContentsRepositorySpy = new RetrieveLastUpdateContentsRepositorySpy()
    const sut = new DbRetrieveLastUpdateContents(retrieveLastUpdateContentsRepositorySpy)
    return {
        sut,
        retrieveLastUpdateContentsRepositorySpy
    }
}

describe('DbRetrieveLastUpdateContents Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call RetrieveLastUpdateContentsRepository with correct values', async () => {
        const { sut, retrieveLastUpdateContentsRepositorySpy } = makeSut()
        await sut.loadLastContents(makeFakeRequest())
        expect(retrieveLastUpdateContentsRepositorySpy.params).toEqual(makeFakeRequest())
    })

    test('Should return the contents', async () => {
        const { sut, retrieveLastUpdateContentsRepositorySpy } = makeSut()
        const contents = await sut.loadLastContents(makeFakeRequest())
        expect(contents).toEqual(retrieveLastUpdateContentsRepositorySpy.result)
    })

    test('Should return null if there is no content', async () => {
        const { sut, retrieveLastUpdateContentsRepositorySpy } = makeSut()
        retrieveLastUpdateContentsRepositorySpy.result = null
        const contents = await sut.loadLastContents(makeFakeRequest())
        expect(contents).toBeNull()
    })

    test('Should throw if LoadContentsByAdminRepository throws', async () => {
        const { sut, retrieveLastUpdateContentsRepositorySpy } = makeSut()
        jest.spyOn(retrieveLastUpdateContentsRepositorySpy, 'loadLastContents').mockImplementationOnce(throwError)
        const promise = sut.loadLastContents(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
})
