import { FindContentByIdRepositorySpy } from '@/tests/data/mocks/mock-db-content'
import { throwError } from '@/tests/domain/test-helpers'
import { DbFindContentById } from '@/data/usecases/content/db-find-content-by-id'

type SutType = {
  sut: DbFindContentById
  findContentByIdRepositorySpy: FindContentByIdRepositorySpy
}

const makeSut = (): SutType => {
    const findContentByIdRepositorySpy = new FindContentByIdRepositorySpy()
    const sut = new DbFindContentById(findContentByIdRepositorySpy)
    return {
        sut,
        findContentByIdRepositorySpy
    }
}

describe('DbFindContentById Usecase', () => {

    test('Should call findContent content', async () => {
        const { sut } = makeSut()
        const loadOneSpy = jest.spyOn(sut, 'findContent')
        const id = 'any_id'
        await sut.findContent(id)
        expect(loadOneSpy).toHaveBeenCalledWith(id)
    })

    test('Should return true if there is content with the id passed', async () => {
        const { sut } = makeSut()
        const response = await sut.findContent('any_id')
        expect(response).toBeTruthy()
    })

    test('Should return false if there is no content with the passed id', async () => {
        const { sut, findContentByIdRepositorySpy } = makeSut()
        findContentByIdRepositorySpy.result = false
        const response = await sut.findContent('any_id')
        expect(response).toBeFalsy()
    })

    test('Should throw if FindContentByIdRepository throws', async () => {
        const { sut, findContentByIdRepositorySpy } = makeSut()
        jest.spyOn(findContentByIdRepositorySpy, 'findById').mockImplementationOnce(throwError)
        const promise = sut.findContent('any_id')
        await expect(promise).rejects.toThrow()
    })
})