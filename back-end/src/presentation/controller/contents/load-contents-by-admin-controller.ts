import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class LoadContentsByAdminController implements Controller {
    constructor (private readonly loadContentsByAdmin: LoadContentsByAdmin) {}
    
    async handle (request: LoadContentsByAdminController.Request): Promise<HttpResponse> {
        try {
            const content = await this.loadContentsByAdmin.load(request)
            if(!content) {
                return noContent()
            }
            return ok(content)
        } catch (error) {
            return serverError(error)
        }
        
    }
}
export namespace LoadContentsByAdminController {
  export type Request = {
    limit?: number
    page?: number
  }
}