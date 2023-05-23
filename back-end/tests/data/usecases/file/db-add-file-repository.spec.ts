import { throwError } from '@/tests/domain/test-helpers'
import { DbAddFile } from '@/data/usecases/files/db-add-file'
import { AddFile } from '@/domain/usecases/files/add-file'
import { AddFileRepositorySpy } from '@/tests/data/mocks/mock-db-files'

type SutType = {
  sut: DbAddFile
  addFileRepositorySpy: AddFileRepositorySpy
}

const makeFakeFile = (): AddFile.Params =>({
    name: 'any_name',
    ext: 'any_ext',
    url: 'any_url',
    mime: 'any_mime_type',
    size: 1111,
    folderPath: 'any_path',
    createdAtById: 'any_id',
    updatedById: 'any_id'
})


const makeSut = (): SutType => {
    const addFileRepositorySpy = new AddFileRepositorySpy()
    const sut = new DbAddFile(addFileRepositorySpy)
    return {
        sut,
        addFileRepositorySpy
    }
}

describe('DbAddContent Usecase', () => {
    test('Should call AddFileRepository with correct values', async () => {
        const { sut, addFileRepositorySpy } = makeSut()
        await sut.addFile(makeFakeFile())
        expect(addFileRepositorySpy.params).toEqual(makeFakeFile())
    })

    test('Should throw if AddFileRepository throws', async () => {
        const { sut, addFileRepositorySpy } = makeSut()
        jest.spyOn(addFileRepositorySpy, 'addFile').mockImplementationOnce(throwError)
        const promise = sut.addFile(makeFakeFile())
        await expect(promise).rejects.toThrow()
    })
})