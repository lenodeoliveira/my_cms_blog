import { LoadFiles } from '@/domain/usecases/files/load-files'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'

export class LoadFilesController implements Controller {
    constructor (private readonly loadFiles: LoadFiles) {}

    async handle (request: LoadFilesController.Request): Promise<HttpResponse> {
        try {
            const files = await this.loadFiles.load(request)
            return files ? ok(files) : noContent()

        } catch (error) {
            return serverError(error)
        }
    }
  
}


export namespace LoadFilesController {
  export type Request = {
    page?: number
    limit?: number
    orderBy?: string
    orientation?: string
  }
}