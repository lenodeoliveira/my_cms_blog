import { Authentication } from '@/domain/usecases/authentication'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '../../protocols/validation'

export class LoginController implements Controller {
    constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
    ) {}
    async handle (request: LoginController.Request): Promise<HttpResponse> {
        try {
            const { email, password } = request

            const error = this.validation.validate({email, password})
            if(error) {
                return badRequest(error)
            }

            const authenticated = await this.authentication.auth({
                email,
                password
            })

            if(!authenticated) {
                return unauthorized()
            }
            return ok(authenticated)
        } catch (error) {
            return serverError(error)
        } 
    }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}