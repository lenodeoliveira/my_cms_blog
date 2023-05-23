import { noContent, notFound, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { RemoveFile } from '@/domain/usecases/files/remove-file'
import { HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class RemoveFileUploadControler implements Controller {
    constructor (
    private readonly removeFile: RemoveFile,
    private readonly validation: Validation
    ) {}
    async handle(request: RemoveFileUploadControler.Result): Promise<HttpResponse> {
        try { 
            const { image } = request
            const error = this.validation.validate(image)
            if(error) {
                return notFound(error)
            }
            this.removeFile.removeFile(image)
            return noContent()
        } catch (error) {
            return  serverError(error)
        }
        
    }
}

export namespace RemoveFileUploadControler {
  export type Result = {
      image: string
      userId: string
    }
}
