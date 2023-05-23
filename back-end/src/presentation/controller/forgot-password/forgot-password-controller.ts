import {Controller} from '@/presentation/protocols/controller'
import {HttpResponse} from '@/presentation/protocols/http'
import {ForgotPassword} from '@/domain/usecases/forgot-password/forgot-password'
import {Validation} from '@/presentation/protocols/validation'
import {badRequest, noContent, notFound} from '@/presentation/helpers/http/http-helpers'

export class ForgotPasswordController implements Controller {
    constructor(
      private  readonly forgoPassword: ForgotPassword,
      private readonly validation: Validation,
    ) {}
  
    async handle (request: ForgotPasswordController.Request): Promise<HttpResponse> {        
        const error = this.validation.validate(request)
        if(error) return badRequest(error)
        
        const user = await this.forgoPassword.generateToken(request.email, request?.host)
        if (!user) {
            return notFound(new Error('User does not exist'))
        }
        return noContent()
    }
}

export namespace ForgotPasswordController {
  export type Request = {
    email: string
    host?: string
  }
}