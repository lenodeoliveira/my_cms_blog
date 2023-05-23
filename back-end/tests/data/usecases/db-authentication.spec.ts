import { mockAuthenticationParams } from '@/tests/domain/mock-account'
import { LoadAccountByEmailRepositorySpy, HashComparerSpy, EncrypterSpy } from '@/tests/data/mocks'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { throwError } from '@/tests/domain/test-helpers'


type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy 
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const hashComparerSpy = new HashComparerSpy()
    const encrypterSpy = new EncrypterSpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
    return {
        sut,
        loadAccountByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
    }
}

describe('DbAuthentication Usecase', () => {
    test('Should call Encryter with correct plaintext', async () => {
        const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(encrypterSpy.plaintext).toBe(loadAccountByEmailRepositorySpy.result.id)
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterSpy } = makeSut()
        jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call HashComparer with correct values', async () => {
        const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(hashComparerSpy.plaintext).toBe(mockAuthenticationParams().password)
        expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
    })

    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparerSpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const response = await sut.auth(mockAuthenticationParams())
        expect(response).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(loadAccountByEmailRepositorySpy.email).toBe(mockAuthenticationParams().email)
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an data on success', async () => {
        const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const { accessToken, name } = await sut.auth(mockAuthenticationParams())
        expect(accessToken).toBe(encrypterSpy.ciphertext)
        expect(name).toBe(loadAccountByEmailRepositorySpy.result.name)
    })
})