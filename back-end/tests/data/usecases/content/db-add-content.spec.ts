import { throwError } from '@/tests/domain/test-helpers'
import { DbAddContent } from '@/data/usecases/content/db-add-content'
import { AddContent } from '@/domain/usecases/content/add-content'
import { AddContentRepositorySpy, CheckSlugRepositorySpy } from '@/tests/data/mocks/mock-db-content'

type SutType = {
  sut: DbAddContent
  addContentRepositorySpy: AddContentRepositorySpy
  checkSlugRepositorySpy: CheckSlugRepositorySpy
}

const makeFakeContent = (): AddContent.Params =>({
    title: 'any_title',
    userId: 'any_id_user',
    slug: 'any_slug',
    image: 'link_url',
    body: 'any_content',
    published: 0,
})


const makeSut = (): SutType => {
    const addContentRepositorySpy = new AddContentRepositorySpy()
    const checkSlugRepositorySpy = new CheckSlugRepositorySpy()
    const sut = new DbAddContent(addContentRepositorySpy, checkSlugRepositorySpy)
    return {
        sut,
        addContentRepositorySpy,
        checkSlugRepositorySpy
    }
}

describe('DbAddContent Usecase', () => {
    test('Should call AddContentRepository with correct values', async () => {
        const { sut, addContentRepositorySpy } = makeSut()
        await sut.add(makeFakeContent())
        expect(addContentRepositorySpy.params).toEqual(makeFakeContent())
    })

    test('Should call CheckSlugRepository with correct value', async () => {
        const { sut, checkSlugRepositorySpy } = makeSut()
        await sut.add(makeFakeContent())
        expect(checkSlugRepositorySpy.slug).toEqual(makeFakeContent().slug)
    })

    test('Should return false if CheckSlugRepository returns true', async () => {
        const { sut, checkSlugRepositorySpy } = makeSut()
        checkSlugRepositorySpy.result = true
        const isValid = await sut.add(makeFakeContent())
        expect(isValid).toBe(false)
    })

    test('Should throw if AddContentRepository throws', async () => {
        const { sut, addContentRepositorySpy } = makeSut()
        jest.spyOn(addContentRepositorySpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(makeFakeContent())
        await expect(promise).rejects.toThrow()
    })
})