import { AddContent } from '@/domain/usecases/content/add-content'
import { LoadContent } from '@/domain/usecases/content/load-content'
import { LoadContents } from '@/domain/usecases/content/load-contents'
import { RemoveContent } from '@/domain/usecases/content/remove-content'
import { UpdateContent } from '@/domain/usecases/content/update-content'
import { FindContentById } from '@/domain/usecases/content/find-content-by-id'
import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'
import { LoadContentByAdmin } from '@/domain/usecases/content/load-content-by-admin'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'
import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'
import { makeFakeContent, makeFakeContents,mockLoadContentByAdmin, mockLoadContentsByAdmin, mockLoadContentsLastUpdate, mockRetrieveQuantityContentsByAuthor } from '@/tests/domain/mock-contents'

export class AddContentSpy implements AddContent{
    params: any
    result = true
    async add (params: any): Promise<AddContent.Result> {
        this.params = params
        return this.result
    }
}

export class LoadContentsSpy implements LoadContents {
    result = makeFakeContents()
    params: LoadContents.Params
    async load (params: LoadContents.Params): Promise<LoadContents.Result>{
        this.params = params
        return this.result
    }
}

export class LoadContentSpy implements LoadContent {
    result = makeFakeContent()
    slug: string
    async loadOne (slug: string): Promise<LoadContent.Result>{
        this.slug = slug
        return this.result
    }
}


export class RemoveContentSpy implements RemoveContent {
    id: string
    result = true
    async removeContent (id: string): Promise<boolean> {
        this.id = id
        return this.result
    }
}
export class UpdateContentSpy implements UpdateContent {
    contentData: UpdateContent.Request
    result = false
    async updateContent (content: UpdateContent.Request): Promise<boolean> {
        this.contentData = content
        return this.result
    }

}

export class FindContentByIdSpy implements FindContentById {
    id: string
    result = true
    async findContent (id: string): Promise<boolean> {
        this.id = id 
        return this.result 
    }
}

export class LoadContentsByAdminSpy implements LoadContentsByAdmin {
    params: LoadContentsByAdmin.Params
    result = mockLoadContentsByAdmin()
    async load (params: LoadContentsByAdmin.Params): Promise<LoadContentsByAdmin.Result> {
        this.params = params
        return this.result
    }
}

export class LoadContentByAdminSpy implements LoadContentByAdmin {
    id: string
    result = mockLoadContentByAdmin()
    async loadOneContent (id: string): Promise<LoadContentByAdmin.Result> {
        this.id = id
        return this.result
    }
}

export class RetrieveLastUpdateContentsSpy implements RetrieveLastUpdateContents {
    params: RetrieveLastUpdateContents.Params
    result: RetrieveLastUpdateContents.Result = mockLoadContentsLastUpdate()

    async loadLastContents (params: RetrieveLastUpdateContents.Params): Promise<RetrieveLastUpdateContents.Result> {
        this.params = params
        return this.result
    }
}

export class RetrieveQuantityContentByAuthorSpy implements RetrieveQuantityContentByAuthor {
    result: RetrieveQuantityContentByAuthor.Result = mockRetrieveQuantityContentsByAuthor()

    async retrieveContents (): Promise<RetrieveQuantityContentByAuthor.Result> {
        return this.result
    }
}



