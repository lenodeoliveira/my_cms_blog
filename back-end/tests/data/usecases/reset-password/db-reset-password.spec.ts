import { DbResetPassword } from '@/data/usecases/reset-password/db-reset-password'
import { HasherSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { ResetPasswordRepositorySpy } from '@/tests/data/mocks/mock-db-reset-password'
import { throwError } from '@/tests/domain/test-helpers'
import MockDate from 'mockdate'

type SutType = {
  sut: DbResetPassword
  resetPasswordRepositorySpy: ResetPasswordRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy,
  hasherSpy: HasherSpy
}

const makeSut = (): SutType => {
    const resetPasswordRepositorySpy = new ResetPasswordRepositorySpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const  hasherSpy = new HasherSpy()
    const sut = new DbResetPassword(resetPasswordRepositorySpy, loadAccountByEmailRepositorySpy, hasherSpy)

    return {
        sut,
        resetPasswordRepositorySpy,
        loadAccountByEmailRepositorySpy,
        hasherSpy

    }
}

describe('DbResetPassword Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })


    test('Should call ResetPasswordRepositorySpy with correct values', async () => {
        const { sut, resetPasswordRepositorySpy } = makeSut()
        jest.spyOn(sut, 'validateToken').mockImplementationOnce(null)

        await sut.resetPassword({
            email: 'any_mail@mail.com',
            code: 'any_code',
            password: 'any_password',
        })
        expect(resetPasswordRepositorySpy.data).toEqual({
            email: 'any_mail@mail.com',
            code: 'any_code',
            password: 'any',
        })
    })

    test('Should throw if ResetPasswordRepository throws', async () => {
        const { sut, resetPasswordRepositorySpy } = makeSut()
        jest.spyOn(sut, 'validateToken').mockImplementationOnce(null)
        jest.spyOn(resetPasswordRepositorySpy, 'resetPassword').mockImplementationOnce(throwError)
        const promise = sut.resetPassword({
            email: 'any_mail@mail.com',
            code: 'any_code',
            password: 'any_password',
        })
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut()
        jest.spyOn(sut, 'validateToken').mockImplementationOnce(null)
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
        const promise = sut.resetPassword({
            email: 'any_mail@mail.com',
            code: 'any_code',
            password: 'any_password',
        })
        await expect(promise).rejects.toThrow()
    })
})