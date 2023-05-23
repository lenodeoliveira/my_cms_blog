import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'


export class RetrieveLastUpdateContentsController implements Controller {
    constructor(
      private readonly retrieveLastUpdateContents: RetrieveLastUpdateContents
    ){}
    async handle (request: RetrieveLastUpdateContentsController.Request): Promise<HttpResponse> {
        try {
            const contents = await this.retrieveLastUpdateContents.loadLastContents(request)
            return contents ? ok(contents) : noContent()

        } catch (err) {
            return serverError(err)
        }
    }  
}

export namespace RetrieveLastUpdateContentsController {
  export type Request = {
    orientation?: string
    orderBy?: string
    page?: number
    limit?: number
    start: Date
    end: Date
  }
}