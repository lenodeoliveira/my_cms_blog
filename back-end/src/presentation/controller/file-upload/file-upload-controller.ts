import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { AddFile } from '@/domain/usecases/files/add-file'
import { Validation } from '@/presentation/protocols/validation'
export class FileUploadController implements Controller {
    constructor (
    private readonly addFile: AddFile,
    private readonly validation: Validation
    ) {}

    async handle(request: FileUploadController.Result): Promise<HttpResponse> {
        try {

            const fileObject = {
                name: request.filename,
                ext: `.${request.mimetype.split('/')[1]}`,
                mime: request.mimetype,
                url: `${request.host}/${request.path.split('/dist/')[1]}`,
                size: request.size,
                folderPath: request.path,
                createdAtById: request.userId,
                updatedById: request.userId,
                
            }

            const { name, ext, url, size, mime, folderPath, createdAtById, updatedById } = fileObject

            const error = this.validation.validate({ size, mime })
            if(error) {
                return badRequest(error)
            }
        
            await this.addFile.addFile({name, ext, url, size, mime, folderPath, createdAtById, updatedById })
        
            return noContent()
      
        } catch (error) {
            return serverError(error)
        }
        
    }
}

export namespace FileUploadController {
  export type Result = {
      filename: string
      mimetype: string
      path: string
      host: string
      size: number,
      userId: string
    }
}