import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'
import { LoadContent } from '@/domain/usecases/content/load-content'

export class LoadContentController implements Controller {
    constructor (private readonly loadContent: LoadContent) {}

    async handle (request: LoadContentController.Request): Promise<HttpResponse> {
        try {
            const { slug } = request
            const content = await this.loadContent.loadOne(slug)
            return content ? ok(content) : noContent()

        } catch (error) {
            return serverError(error)
        }
    }
  
}


export namespace LoadContentController {
  export type Request = {
    slug: string
  }
}