import { LoadContentByAdmin } from '@/domain/usecases/content/load-content-by-admin'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class LoadContentByAdminController implements Controller {
    constructor(private readonly loadContentByAdmin: LoadContentByAdmin) {}

    async handle (request: LoadContentByAdminController.Request): Promise<HttpResponse> {
        try {
            const content = await this.loadContentByAdmin.loadOneContent(request.id)
            if(!content) {
                return noContent()
            }
            return ok(content)
        } catch (error) {
            return serverError(error)
        }
    } 
}

export namespace LoadContentByAdminController {
  export type Request = {
    id: string
  }
}