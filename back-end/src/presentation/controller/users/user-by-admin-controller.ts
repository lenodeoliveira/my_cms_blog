import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'


export class UsersByAdminController implements Controller {
    constructor (
     private readonly findUserByAdmin: FindUserByAdmin,
    ) {}

    async handle (request: UsersByAdminController.Request): Promise<HttpResponse> {
        try {
            const users = await this.findUserByAdmin.findUsers(request)
            return users ? ok(users) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UsersByAdminController {
  export type Request = {
    page?: number
    limit?: number
  }
}