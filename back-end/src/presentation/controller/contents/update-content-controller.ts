import { UpdateContent } from '@/domain/usecases/content/update-content'
import { FindContentById } from '@/domain/usecases/content/find-content-by-id'
import { SlugInUseError } from '@/presentation/errors/slug-in-use-error'
import { noContent, notFound, forbidden, serverError, badRequest } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class UpdateContentController implements Controller {

    constructor(
      private readonly updatedContent: UpdateContent,
      private readonly findContentById: FindContentById,
      private readonly validation: Validation
    ) {}

    async handle (request: UpdateContentController.Result): Promise<HttpResponse> {
        try {

            const error = this.validation.validate(request)

            if(error) {
                return badRequest(error)
            }

            const exists = await this.findContentById.findContent(request.id)
            if(!exists) {
                return notFound(new Error('content not exists'))
            }

            const isValidSlugForUpdate = await this.updatedContent.updateContent(request)
            if(isValidSlugForUpdate) {
                return forbidden(new SlugInUseError())
            }

            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }

}

export namespace UpdateContentController {
  export type Result = {
    id: string
    title: string
    userId: string
    slug: string
    image?: string
    body: string
    published: number
  }
}