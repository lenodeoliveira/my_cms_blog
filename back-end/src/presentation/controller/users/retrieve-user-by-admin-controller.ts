import { RetrieveUserByAdmin } from '@/domain/usecases/users/retrieve-user'
import { noContent, serverError, ok } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'


export class RetrieveUserByAdminController implements Controller {
    constructor (
    private readonly retrieveUserByAdmin: RetrieveUserByAdmin,
    ) {}
    async handle(request: RetrieveUserByAdminController.Request): Promise<HttpResponse> {
        try {
            const user = await this.retrieveUserByAdmin.retrieveUser(request.id)
            if(!user) {
                return noContent()
            }
            return ok(user)
        }  catch (error) { 
            return serverError(error)
        }
       
    }
}

export namespace RetrieveUserByAdminController {
  export type Request = {
    id: string
  }
}