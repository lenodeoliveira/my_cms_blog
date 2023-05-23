import { UpdateContentSpy, FindContentByIdSpy } from '@/tests/presentation/mocks/mock-content'
import { UpdateContentController } from '@/presentation/controller/contents/update-content-controller'
import { throwError } from '@/tests/domain/test-helpers'
import { badRequest, forbidden, noContent, notFound, serverError } from '@/presentation/helpers/http/http-helpers'
import { SlugInUseError } from '@/presentation/errors/slug-in-use-error'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'

type SutTypes = {
  sut: UpdateContentController
  updateContentSpy: UpdateContentSpy
  findContentByIdSpy: FindContentByIdSpy,
  validationSpy: ValidationSpy
}

const makeFakeRequest = (): UpdateContentController.Result => ({
    id: 'any_id',
    title: 'any_title',
    userId: 'any_id_user',
    slug: 'any_slug',
    image: 'link_url',
    body: 'any_content',
    published: 0,
})

const makeSut = (): SutTypes => {
    const findContentByIdSpy = new FindContentByIdSpy()
    const updateContentSpy = new UpdateContentSpy()
    const validationSpy = new ValidationSpy()
    const sut = new UpdateContentController(updateContentSpy, findContentByIdSpy, validationSpy)
    return {
        sut,
        updateContentSpy,
        findContentByIdSpy,
        validationSpy
    }
}


describe('UpdateContent Controller', () => {
    test('Should call UpdateContent with correct values', async () => {
        const { sut, updateContentSpy } = makeSut()
        const request = makeFakeRequest()
        await sut.handle(request)
        expect(updateContentSpy.contentData).toEqual(request)
    })

    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        await sut.handle(makeFakeRequest())
        expect(validationSpy.input).toEqual(makeFakeRequest())
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

    test('Should return 204 on success', async () => {
        const { sut } = makeSut()
        const httpRequest = await sut.handle(makeFakeRequest())
        expect(httpRequest).toEqual(noContent())
    })

    test('Should return the status code 404, if the content does not exist', async () => {
        const { sut, findContentByIdSpy } = makeSut()
        findContentByIdSpy.result = false
        const request = makeFakeRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(notFound(new Error('content not exists')))
    })

    test('Should return 403 if a slug already exists', async () => {
        const { sut, updateContentSpy } = makeSut()
        updateContentSpy.result = true
        const request = makeFakeRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse).toEqual(forbidden(new SlugInUseError()))
    })

    test('Should return 500 if UpdateContent throws', async () => {
        const { sut, updateContentSpy } = makeSut()
        jest.spyOn(updateContentSpy, 'updateContent').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})