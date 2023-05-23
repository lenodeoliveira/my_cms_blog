import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { AuthMiddleware } from '@/presentation/middlwares/auth-middleware'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks/mock-account'
import { throwError } from '@/tests/domain/test-helpers'

const mockRequest = (): AuthMiddleware.Request => ({
    accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (status: number, role?: string): SutTypes => {
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const sut = new AuthMiddleware(loadAccountByTokenSpy, status, role)
    return {
        sut,
        loadAccountByTokenSpy
    }

}

describe('Auth Middeware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut(1, null)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByEmail with corrrect accessToken', async () => {
        const role = 'any_role'
        const { sut, loadAccountByTokenSpy } = makeSut(1, role)
        await sut.handle(mockRequest())
        expect(loadAccountByTokenSpy.accessToken).toBe('any_token')
        expect(loadAccountByTokenSpy.role).toBe(role)
    })

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut(1, null)
        loadAccountByTokenSpy.result = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut(1, null)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok({
            userId: loadAccountByTokenSpy.result.id
        }))
    })

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut(1, null)
        jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
      
    })
})