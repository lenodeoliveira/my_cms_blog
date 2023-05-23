import { HttpResponse } from '@/presentation/protocols/http'
import { Middleware } from '@/presentation/protocols/middleware'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
    constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly status: number,
    private readonly role?: string
    ) {}
    async handle (request: AuthMiddleware.Request) : Promise<HttpResponse> {
        try {

            const { accessToken } = request
            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.status, this.role)
                if (account) {
                    return ok({
                        userId: account.id
                    })
                }
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
