import { LoadContent } from '@/domain/usecases/content/load-content'
import { LoadContents } from '@/domain/usecases/content/load-contents'
import { LoadContentByAdmin } from '@/domain/usecases/content/load-content-by-admin'
import { LoadContentsByAdmin } from '@/domain/usecases/content/load-contents-by-admin'
import { RetrieveLastUpdateContents } from '@/domain/usecases/dashboard/retrieve-last-update-contents'
import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'

export const mockLoadContentsByAdmin = (): LoadContentsByAdmin.Result => {
    return {
        count: 1,
        rows: [{
            id: 'any_id',
            title: 'any_title',
            author: 'any_author',
            slug: 'any-slug',
            image: 'url_link',
            body: 'any_desc',
            published: 1,
            createAt: new Date(),
            updateAt: new Date()
        }
        ]
    }   
}

export const mockLoadContentsLastUpdate = (): RetrieveLastUpdateContents.Result => {
    return {
        count: 2,
        rows: [{
            id: 'any_id',
            title: 'any_title',
            author: 'any_author',
            content: 'any_content',
            lastUpdate: new Date(),
        },
        {
            id: 'other_id',
            title: 'other_title',
            author: 'other_author',
            content: 'other_content',
            lastUpdate: new Date(),
        }
        ]
    }   
}

export const mockLoadContentByAdmin = (): LoadContentByAdmin.Result => ({
    id: 'any_id',
    title: 'any_title',
    author: 'any_author',
    slug: 'any-slug',
    image: 'url_link',
    body: 'any_desc',
    published: 1,
    createAt: new Date(),
    updateAt: new Date()
})

export const makeFakeContents = (): LoadContents.Result => {

    return {
        count: 2,
        rows: [
            {
                id: 'any_id',
                title: 'any_title',
                author: 'any_user',
                slug: 'any_slug',
                body: 'any_body',
                image: 'any_link',
                published: 1,
                createAt: new Date(),
                updateAt: new Date()
            },
            {
                id: 'other_id',
                title: 'other_title',
                author: 'other_user',
                slug: 'other_slug',
                body: 'other_body',
                image: 'other_link',
                published: 1,
                createAt: new Date(),
                updateAt: new Date()
            }
        ]
    }
}

export const makeFakeContent = (): LoadContent.Result => ({
    id: 'other_id',
    title: 'other_title',
    author: 'other_user',
    slug: 'other_slug',
    body: 'other_body',
    image: 'other_link',
    published: 1,
    createAt: new Date(),
    updateAt: new Date()
})

export const mockRetrieveQuantityContentsByAuthor = (): RetrieveQuantityContentByAuthor.Result => ([{
    quantity: 1,
    authors: 'any_author'
}])
