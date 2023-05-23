import { Files } from '@/data/usecases/files/files'
import { RemoveFileRepositorySpy } from '@/tests/data/mocks/mock-db-files'
import { throwError } from '@/tests/domain/test-helpers'

import fs from 'fs'

jest.mock('fs', () => ({
    unlink (): boolean {
        return true
    }
}))


type SutType = {
  sut: Files
  removeFileRepositorySpy: RemoveFileRepositorySpy
}

const makeSut = (): SutType => {
    const removeFileRepositorySpy = new RemoveFileRepositorySpy()
    const sut = new Files(removeFileRepositorySpy)
    return {
        sut,
        removeFileRepositorySpy
    }
}

describe('File Usecase', () => {
    test('Should be possible to successfully remove an image', () => {
        const { sut } = makeSut()
        jest.spyOn(fs, 'unlink')
        sut.removeFile('any_image')
        expect(fs.unlink).toHaveBeenCalledTimes(1)
    })

    test('Should call AddFileRepository with correct values', async () => {
        const { sut, removeFileRepositorySpy } = makeSut()
        await sut.removeFile('any_image')
        expect(removeFileRepositorySpy.text).toBe('any_image')
    })

    test('Should throw if AddFileRepository throws', async () => {
        const { sut, removeFileRepositorySpy } = makeSut()
        jest.spyOn(removeFileRepositorySpy, 'removeFile').mockImplementationOnce(throwError)
        await expect(sut.removeFile('any_image')).rejects.toThrow()
    })
})
