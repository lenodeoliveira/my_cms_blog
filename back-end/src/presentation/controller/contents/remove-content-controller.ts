import { RemoveContent } from '@/domain/usecases/content/remove-content'
import { noContent, notFound, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'

export class RemoveContentController implements Controller {
    constructor(private readonly removeContent: RemoveContent) {}
    
    async handle (request: RemoveContentController.Result): Promise<HttpResponse> {
        try {
            const wasRemoved = await this.removeContent.removeContent(request.id)
            return wasRemoved ? noContent() : notFound(new Error('content not exists'))
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace RemoveContentController {
  export type Result = {
    id: string
  }
}