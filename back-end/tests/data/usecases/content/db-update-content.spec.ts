import { UpdateContentRepositorySpy, CheckSlugRepositoryForUpDateSpy } from '@/tests/data/mocks/mock-db-content'
import { DbUpdateContent } from '@/data/usecases/content/db-update-content'
import { throwError } from '@/tests/domain/test-helpers'
import { UpdateContentRepository } from '@/data/protocols/db/content/admin/update-content-repository'


type SutTypes = {
  sut: DbUpdateContent
  updateContentRepositorySpy: UpdateContentRepositorySpy,
  checkSlugRepositoryForUpDateSpy: CheckSlugRepositoryForUpDateSpy
}

const makeFakeData = (): UpdateContentRepository.Result => ({
    id: 'any_id',
    title: 'any_title',
    userId: 'any_id_user',
    slug: 'any_slug',
    image: 'link_url',
    body: 'any_content',
    published: 0,
})

const makeSut = (): SutTypes => {
    const updateContentRepositorySpy = new UpdateContentRepositorySpy()
    const checkSlugRepositoryForUpDateSpy = new CheckSlugRepositoryForUpDateSpy()
    const sut = new DbUpdateContent(updateContentRepositorySpy, checkSlugRepositoryForUpDateSpy)

    return {
        sut,
        updateContentRepositorySpy,
        checkSlugRepositoryForUpDateSpy
    }
}

describe('UpdateContentRepository usecase', () => {
    test('Should call Update with correct values', async () => {
        const { sut, updateContentRepositorySpy } = makeSut()
        const data = makeFakeData()
        await sut.updateContent(data)
        expect(updateContentRepositorySpy.data).toEqual(data)
    })

    test('Should call CheckSlugRepository with correct value', async () => {
        const { sut, checkSlugRepositoryForUpDateSpy } = makeSut()
        await sut.updateContent(makeFakeData())
        expect(checkSlugRepositoryForUpDateSpy.id).toEqual(makeFakeData().id)
        expect(checkSlugRepositoryForUpDateSpy.slug).toEqual(makeFakeData().slug)
    })

    test('Should throw if UpdateContentRepository throws', async () => {
        const { sut, updateContentRepositorySpy } = makeSut()
        jest.spyOn(updateContentRepositorySpy, 'update').mockImplementationOnce(throwError)
        const promise = sut.updateContent(makeFakeData())
        await expect(promise).rejects.toThrow()
    })
})