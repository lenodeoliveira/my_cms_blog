import { LogControllerDecorator } from '@/main/decorators/log'
import { serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { LogErrorFile } from '@/utils/protocols/log-error-file'

const makeLogErrorFile = (): LogErrorFile => {
    class LogErrorFileStub implements LogErrorFile {
        async log (stack: string): Promise<void> {
            return Promise.resolve(null)
        }
    }

    return new LogErrorFileStub()
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(request: any): Promise<HttpResponse> {
            const httpResponse = {
                statusCode: 200,
                body: {
                    name: 'any_name',
                    email: 'any_mail@gmail.com',
                }
            }
            return Promise.resolve(httpResponse)
        }
    }
    return new ControllerStub()
}

type SutTypes = {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorFileStub: LogErrorFile
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorFileStub = makeLogErrorFile()
    const sut = new LogControllerDecorator(controllerStub, logErrorFileStub)
    return {
        sut, 
        controllerStub,
        logErrorFileStub
    }

}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@gmail.com',
                password: '12345',
                passwordConfirmation: '12345',
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@gmail.com',
                password: '12345',
                passwordConfirmation: '12345',
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'any_name',
                email: 'any_mail@gmail.com',
            }
        })
    })

    test('Should call LogErrorFile with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorFileStub } = makeSut()

        const fakeError = new Error()
        fakeError.stack = 'any_stack'

        const error = serverError(fakeError)
        const logSpy = jest.spyOn(logErrorFileStub, 'log')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@gmail.com',
                password: '12345',
                passwordConfirmation: '12345',
            }
        }
        await sut.handle(httpRequest)
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})