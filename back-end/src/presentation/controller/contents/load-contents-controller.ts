import { LoadContents } from '@/domain/usecases/content/load-contents'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'

export class LoadContentsController implements Controller {
    constructor (private readonly loadContents: LoadContents) {}

    async handle (request: LoadContentsController.Request): Promise<HttpResponse> {
        try {
            const contents = await this.loadContents.load(request)
            return contents ? ok(contents) : noContent()

        } catch (error) {
            return serverError(error)
        }
    }
  
}


export namespace LoadContentsController {
  export type Request = {
    page: number
    limit: number
  }
}