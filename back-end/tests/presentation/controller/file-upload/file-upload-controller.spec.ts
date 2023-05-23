import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helpers'
import { FileUploadController } from '@/presentation/controller/file-upload/file-upload-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { AddFileSpy } from '@/tests/presentation/mocks/mock-files'
import { throwError } from '@/tests/domain/test-helpers'

const makeFakeHttpRequest = (): FileUploadController.Result =>({
    filename: 'any_original_name',
    mimetype: 'image/jpe',
    path: '/cms-brave/dist/static/any_image.jpg',
    host: 'any_host',
    size: 11111,
    userId: 'any_id',

})

type SutTypes = {
  sut: FileUploadController
  addFileSpy: AddFileSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addFileSpy = new AddFileSpy()
    const sut = new FileUploadController(addFileSpy, validationSpy)

    return {
        sut,
        addFileSpy,
        validationSpy,
    }
}

describe('RemoveFileUploadControler', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        await sut.handle(makeFakeHttpRequest())
        expect(validationSpy.input).toEqual({
            mime: 'image/jpe',
            size: 11111,
        })
    })

    test('Should call AddFile with correct values', async () => {
        const { sut, addFileSpy } = makeSut()
        await sut.handle(makeFakeHttpRequest())
        expect(addFileSpy.params).toEqual({
            ext: '.jpe',
            folderPath: '/cms-brave/dist/static/any_image.jpg',
            mime: 'image/jpe',
            name: 'any_original_name',
            size: 11111,
            url: 'any_host/static/any_image.jpg',
            createdAtById: 'any_id',
            updatedById: 'any_id',
        })
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

    test('Should return 500 if AddFile throws', async () => {
        const { sut, addFileSpy } = makeSut()
        jest.spyOn(addFileSpy, 'addFile').mockRejectedValueOnce(throwError)
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(noContent())
    })
})


       
