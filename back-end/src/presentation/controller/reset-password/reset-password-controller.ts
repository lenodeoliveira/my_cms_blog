import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { ResetUserPassword } from '@/domain/usecases/reset-password/reset-password'
import { badRequest, forbidden, noContent, notFound } from '@/presentation/helpers/http/http-helpers'
import { EmailInUseError, TokenExpiredError, TokenInvalidError } from '@/presentation/errors'

export class ResetPasswordController implements Controller {
    constructor(
      private readonly resetPassword: ResetUserPassword,
      private readonly validation: Validation
    ){}

    async handle (request: ResetPasswordController.Request): Promise<HttpResponse> {
        
        const error = this.validation.validate(request)

        if(error) {
            return badRequest(error)
        }
      
        const { email, code, password } = request
        const reset = await this.resetPassword.resetPassword({ email, code, password})

        if(reset === 'expired') {
            return forbidden(new TokenExpiredError())
        }

        if(reset === 'invalid') {
            return forbidden(new TokenInvalidError())
        }

        if(!reset) {
            return notFound(new Error('User does not exists!'))
        }
        return noContent()
    } 
}

export namespace ResetPasswordController {
  export type Request = {
    email: string
    code: string
    password: string
    passwordConfirmation: string
  }
}