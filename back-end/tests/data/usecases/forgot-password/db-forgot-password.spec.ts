import {DbForgotPassword} from '@/data/usecases/forgot-password/db-forgot-password'
import {CheckAccountByEmailRepositorySpy, MailProviderSpy} from '@/tests/data/mocks'
import {ForgotPasswordRepositorySpy} from '@/tests/data/mocks/mock-db-forgot-password'
import { throwError } from '@/tests/domain/test-helpers'


type SutTypes = {
  sut: DbForgotPassword
  forgotPasswordRepositorySpy: ForgotPasswordRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy,
  mailProviderSpy: MailProviderSpy
}

const makeSut = (): SutTypes => {
    const forgotPasswordRepositorySpy = new ForgotPasswordRepositorySpy()
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const mailProviderSpy = new MailProviderSpy()
    const sut = new DbForgotPassword(forgotPasswordRepositorySpy, checkAccountByEmailRepositorySpy, mailProviderSpy)
    return {
        sut,
        forgotPasswordRepositorySpy,
        checkAccountByEmailRepositorySpy,
        mailProviderSpy
    }
}

describe('DbForgotPassword Usecase', () => {
    test('Should call ForgotPasswordRepository with correct value', async () => {
        const { sut, forgotPasswordRepositorySpy, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        await sut.generateToken('any_mail@mail.com')
        expect(forgotPasswordRepositorySpy.email).toBe('any_mail@mail.com')
    })
  
    test('Should call checkAccountByEmailRepositorySpy with correct value', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        await sut.generateToken('any_mail@mail.com')
        expect(checkAccountByEmailRepositorySpy.email).toBe('any_mail@mail.com')
    })

    test('Should return true if CheckAccountByEmailRepository returns true', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        const user = await sut.generateToken('any_mail@mail.com')
        expect(user).toEqual({
            email: 'any_mail@mail.com',
            passwordResetToken: 'any_token'
        })
    })

    test('Should throw if ForgotPasswordRepository throws', async () => {
        const { sut, forgotPasswordRepositorySpy, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        jest.spyOn(forgotPasswordRepositorySpy, 'generateToken').mockImplementationOnce(throwError)
        const promise = sut.generateToken('any_mail@gmail.com')
        await expect(promise).rejects.toThrow()
    })
})