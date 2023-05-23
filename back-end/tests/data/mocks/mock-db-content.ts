import { LoadContentsRepository  } from '@/data/protocols/db/content/load-contents-repository'
import { LoadContents  } from '@/domain/usecases/content/load-contents'
import { LoadContent  } from '@/domain/usecases/content/load-content'
import { AddContentRepository } from '@/data/protocols/db/content/admin/add-content-repository'
import { CheckSlugRepository } from '@/data/protocols/db/content/check-slug-repository'
import { LoadContentRepository } from '@/data/protocols/db/content/load-content-repository'
import { RemoveContentRepository } from '@/data/protocols/db/content/admin/remove-content-repository'
import { UpdateContentRepository } from '@/data/protocols/db/content/admin/update-content-repository'
import { CheckSlugRepositoryForUpDate } from '@/data/protocols/db/content/check-slug-repository-for-update'
import { FindContentByIdRepository } from '@/data/protocols/db/content/find-content-by-id'
import { LoadContentsByAdminRepository } from '@/data/protocols/db/content/admin/load-contents-by-admin-repository'
import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'
import { LoadContentByAdminRepository } from '@/data/protocols/db/content/admin/load-content-by-admin-repository'
import { RetrieveLastUpdateContentsRepository } from '@/data/protocols/db/content/dashboard/retrieve-last-update-contents-repository'
import { RetrieveQuantityContentByAuthorRepository } from '@/data/protocols/db/content/dashboard/retrieve-quantity-content-by-author-repository'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'
import { mockLoadContentsByAdmin, mockLoadContentsLastUpdate, mockRetrieveQuantityContentsByAuthor } from '@/tests/domain/mock-contents'

export class AddContentRepositorySpy implements AddContentRepository {
    params: AddContentRepository.Params
    result = true

    async add (params: AddContentRepository.Params): Promise<AddContentRepository.Result> {
        this.params = params
        return this.result
    }
}

export class RemoveContentRepositorySpy implements RemoveContentRepository {
    id: string
    result = true
    async remove (id: string): Promise<boolean> {
        this.id = id
        return this.result
    }

}

export class UpdateContentRepositorySpy implements UpdateContentRepository {
    data: UpdateContentRepository.Result
    async update (content: UpdateContentRepository.Result): Promise<void> {
        this.data = content
    }

}

export class CheckSlugRepositoryForUpDateSpy implements CheckSlugRepositoryForUpDate {
    id: string
    slug: string
    result = false

    async checkSlugForUpdate (id: string, slug: string): Promise<CheckSlugRepositoryForUpDate.Result> {
        this.id = id
        this.slug = slug
        return this.result
    }
}

export class CheckSlugRepositorySpy implements CheckSlugRepository {
    slug: string
    result = false

    async checkSlug (slug: string): Promise<CheckSlugRepository.Result> {
        this.slug = slug
        return this.result
    }
}



export class LoadContentsRepositorySpy implements LoadContentsRepository {
    params: LoadContentsRepository.Params
    result = makeFakeContents()
    async loadAll (params: LoadContents.Params): Promise<LoadContents.Result> {
        this.params = params
        return this.result
    }
}

//one content
export class LoadContentByAdminRepositorySpy implements LoadContentByAdminRepository {
    id: string
    result = makeFakeContent()
    async loadContentByAdmin (id: string): Promise<LoadContentRepository.Result> {
        this.id = id
        return this.result
    }
}

export class LoadContentRepositorySpy implements LoadContentRepository {
    loadContentByAdmin: (id: string) => Promise<LoadContentRepository.Result>
    slug: string
    result = makeFakeContent()
    async findOneContent (slug: string): Promise<LoadContentRepository.Result> {
        this.slug = slug
        return this.result
    }
}

export class FindContentByIdRepositorySpy implements FindContentByIdRepository {
    id: string
    result = true
    async findById (id: string): Promise<boolean> {
        this.id = id 
        return this.result
    }
}

export class LoadContentsByAdminRepositorySpy implements LoadContentsByAdminRepository {
    params: LoadContentsByAdminRepository.Params
    result = mockLoadContentsByAdmin()
    
    async loadContentsByAdmin (params: LoadContentsByAdmin.Params): Promise<LoadContentsByAdmin.Result> {
        this.params = params
        return this.result
    }
}
export class RetrieveLastUpdateContentsRepositorySpy implements RetrieveLastUpdateContentsRepository {
    params: LoadContentsByAdminRepository.Params
    result = mockLoadContentsLastUpdate()

    async loadLastContents (params: RetrieveLastUpdateContents.Params): Promise<RetrieveLastUpdateContents.Result> {
        this.params = params
        return this.result
    }
}

export class RetrieveQuantityContentByAuthorRepositorySpy implements RetrieveQuantityContentByAuthorRepository {
    result = mockRetrieveQuantityContentsByAuthor()
  
    async retrieveContents (): Promise<RetrieveQuantityContentByAuthorRepository.Result> {
        return this.result
    }
}



export const makeFakeContents = (): LoadContents.Result => {
    return {
        'count': 10,
        'rows': [
            {
                'id': '55345379-7d90-476d-aeb3-d0f4b3f0f376',
                'title': 'title-test',
                'author': 'John Doe',
                'slug': 'slug-test',
                'image': 'body-test',
                'body': 'image-test',
                'published': 0,
                'createAt': null,
                'updateAt': null
            }
        ]
    }
}

export const makeFakeContent = (): LoadContent.Result => (
    {
        'id': '55345379-7d90-476d-aeb3-d0f4b3f0f376',
        'title': 'title-test',
        'author': 'John Doe',
        'slug': 'slug-test',
        'image': 'body-test',
        'body': 'image-test',
        'published': 0,
        'createAt': null,
        'updateAt': null
    }
)