import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'
import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helpers'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'


export class RetrieveQuantityContentByAuthorController implements Controller {
    constructor (private readonly retrieveQuantityContentByAuthor: RetrieveQuantityContentByAuthor) {}
    
    async handle (request: any): Promise<HttpResponse> {
        try {
            const contents = await this.retrieveQuantityContentByAuthor.retrieveContents()
            return contents ? ok(contents) : noContent()
        } catch (err) {
            return serverError(err)
        }  
    }
}