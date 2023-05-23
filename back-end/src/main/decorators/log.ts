import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { LogErrorFile } from '@/utils/protocols/log-error-file'
export class LogControllerDecorator implements Controller {
    constructor (
      private readonly controller: Controller,
      private readonly logErrorFile: LogErrorFile
    ) {}
    async handle (request: any): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(request)
        if(httpResponse.statusCode === 500) {
            this.logErrorFile.log(httpResponse.body.stack)
        }
        return httpResponse
    }
}