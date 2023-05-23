import { notFound, noContent, serverError } from '@/presentation/helpers/http/http-helpers'
import { RemoveFileUploadControler } from '@/presentation/controller/file-upload/remove-upload-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { RemoveFileSpy } from '@/tests/presentation/mocks/mock-files'

const makeFakeHttpRequest = (): RemoveFileUploadControler.Result =>({
    image: 'any_image',
    userId: 'any_Id'
})

type SutTypes = {
  sut: RemoveFileUploadControler
  validationSpy: ValidationSpy
  removeFileSpy: RemoveFileSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const removeFileSpy = new RemoveFileSpy()
    const sut = new RemoveFileUploadControler(removeFileSpy, validationSpy)

    return {
        sut,
        validationSpy,
        removeFileSpy
    }
}

describe('RemoveFileUploadControler', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        await sut.handle(makeFakeHttpRequest())
        expect(validationSpy.input).toBe('any_image')
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(notFound(validationSpy.error))
    })

    test('Should call RemoveFile with correct values', async () => {
        const { sut, removeFileSpy } = makeSut()
        await sut.handle(makeFakeHttpRequest())
        expect(removeFileSpy.params).toEqual(makeFakeHttpRequest().image)
    })

    test('Should return 500 if RemoveFile throws', async () => {
        const { sut, removeFileSpy } = makeSut()
        jest.spyOn(removeFileSpy, 'removeFile').mockImplementation(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(noContent())
    })
})


