
import { AddContentRepository } from '@/data/protocols/db/content/admin/add-content-repository'
import { LoadContentsRepository } from '@/data/protocols/db/content/load-contents-repository'
import { LoadContentRepository } from '@/data/protocols/db/content/load-content-repository'
import { CheckSlugRepository } from '@/data/protocols/db/content/check-slug-repository'
import { CheckSlugRepositoryForUpDate } from '@/data/protocols/db/content/check-slug-repository-for-update'
import { RemoveContentRepository } from '@/data/protocols/db/content/admin/remove-content-repository'
import { FindContentByIdRepository } from '@/data/protocols/db/content/find-content-by-id'
import { UpdateContentRepository } from '@/data/protocols/db/content/admin/update-content-repository'
import { LoadContents } from '@/domain/usecases/content/load-contents'
import { LoadContentsByAdminRepository } from '@/data/protocols/db/content/admin/load-contents-by-admin-repository'
import { LoadContentByAdminRepository } from '@/data/protocols/db/content/admin/load-content-by-admin-repository'
import { RetrieveLastUpdateContentsRepository } from '@/data/protocols/db/content/dashboard/retrieve-last-update-contents-repository'
import { RetrieveQuantityContentByAuthorRepository } from '@/data/protocols/db/content/dashboard/retrieve-quantity-content-by-author-repository'
import { Content, User } from './entities/users'
import { Op, Sequelize } from 'sequelize'
import slugify from 'slugify'
import _ from 'lodash'
import { RetrieveQuantityContentByAuthor } from '@/domain/usecases/dashboard/retrieve-quantity-content-by-author'

export class ContentMysqlRepository implements 
AddContentRepository,
LoadContentsRepository,
CheckSlugRepository,
LoadContentRepository,
RemoveContentRepository,
UpdateContentRepository,
CheckSlugRepositoryForUpDate,
FindContentByIdRepository,
LoadContentsByAdminRepository,
LoadContentByAdminRepository,
RetrieveLastUpdateContentsRepository,
RetrieveQuantityContentByAuthorRepository {
    
    async add (data: AddContentRepository.Params): Promise<AddContentRepository.Result> {
        const content = Object.assign(data, { slug: slugify(data.slug) })
        await Content.create(content)
        return true
    }

    async checkSlug (slug: string): Promise<boolean> {
        const exists = await Content.findAll({
            attributes: [
                'slug'
            ],
            where: {
                slug:  slugify(slug)
            }
        })
        return exists.length !== 0

    }

    async loadAll (params: LoadContents.Params): Promise<LoadContents.Result> {
        const reqOffSet = Number(params.page)
        const reqLimit = Number(params.limit)

        const offset =  isNaN(reqOffSet) ? 0 : reqOffSet
        const limit = isNaN(reqLimit) ? 50 : reqLimit

        const contents = await Content.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['title', 'ASC']],
            attributes: [
                'id',
                'title',
                'slug',
                'image',
                'body',
                'published',
                'createdAt',
                'updatedAt'
            ],
            include: [{
                model: User,
                attributes: ['name'],
            },
            ],
            where: {
                published: 1
            }
        })

        const mapContents = this.mapLoadContents(contents.rows, contents.count)
        const loadAllContents = mapContents !== null ? mapContents : null
        return loadAllContents
    }

    private mapLoadContents (data: any[], count?: number): LoadContents.Result {
        if(data === null ) return null
        const rows = data.map(item => {
            
            return {
                id: item.id,
                title: item.title,
                author: item['User'].name,
                slug: item.slug,
                image: item?.image,
                body: item.body,
                published: item.published,
                createAt: item.createdAt, 
                updateAt: item.updatedAt,
            }        
        })

        return {
            count: count,
            rows: rows
        }
    }

    async findOneContent (slug: string): Promise<LoadContentRepository.Result> {
        const content = await Content.findOne({
            include: [{
                model: User,
                attributes: ['name']
            },
            ],
            where: {
                slug: slug,
                published: 1
            }
        })
        const contentMap = this.mapLoadContents(content === null ? null : [content])
        const contentBySlug = contentMap !== null ? contentMap.rows[0] : null
        return contentBySlug
    }

    async remove (id: string): Promise<boolean> {
        const contentRemoved = await Content.destroy({
            where: {
                id: id
            }
        })
        
        return contentRemoved ? true : false
    }

    async update (content: UpdateContentRepository.Result): Promise<void> {
        await Content.update({
            title: content.title,
            image: content.image,
            userId: content.userId,
            body: content.body,
            slug: slugify(content.slug),
            published: content.published

        }, {
            where: {
                id: content.id
            }
        })
    }

    async checkSlugForUpdate (id: string, slug: string): Promise<CheckSlugRepositoryForUpDate.Result> {
        const { count } = await Content.findAndCountAll({
            where: {
                slug: {
                    [Op.eq]: slugify(slug),
                },
                id: {
                    [Op.ne]: id
                }
            }
        })
        return count > 0 ? true : false
    }

    async findById (id: string): Promise<FindContentByIdRepository.Result> {
        const contentById = await Content.findOne({
            where: {
                id: id
            }
        }) 
        return contentById === null ? false : true
    }

    async loadContentsByAdmin (params: LoadContentsByAdminRepository.Params): Promise<LoadContentsByAdminRepository.Result> {
        const reqOffSet = Number(params.page)
        const reqLimit = Number(params.limit)

        const offset =  isNaN(reqOffSet) ? 0 : reqOffSet
        const limit = isNaN(reqLimit) ? 50 : reqLimit

        let contents: LoadContentsByAdminRepository.Result = null

        const response = await Content.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['title', 'ASC']],
            attributes: [
                'id',
                'title',
                'slug',
                'image',
                'body',
                'published',
                'createdAt',
                'updatedAt'
            ],
            include: [{
                model: User,
                attributes: ['name'],
            },
            ],
        })

        contents = this.mapLoadContents(response.rows, response.count)

        return contents ? contents : null

    }

    async loadContentByAdmin (id: string): Promise<LoadContentByAdminRepository.Result> {
        
        const content = await Content.findAll(
            {
                attributes: [
                    'id',
                    'title',
                    'slug',
                    'image',
                    'body',
                    'published',
                    'createdAt',
                    'updatedAt'
                ],
                include: [{
                    model: User,
                    attributes: ['name'],
                },
                ],
                where: {
                    id: id
                }
            }
        )
        if(!content.length) return false

        return {
            id: content[0].id,
            title: content[0].title,
            slug: content[0].slug,
            image: content[0]?.image,
            body: content[0].body,
            published: content[0].published,
            createAt: content[0].createdAt,
            updateAt: content[0].updatedAt,
            author: content[0]?.['User'].name,
        }
    }

    async loadLastContents (params: RetrieveLastUpdateContentsRepository.Params): Promise<RetrieveLastUpdateContentsRepository.Result> {
        let allContents = null
        
        let limit = 10000
        let offset = 0
      
        if (Number(params?.page)) {
            limit = params.page
        }

        if (Number(params?.limit)) {
            offset = params.limit
        }

        const orientation = params.orientation ? params.orientation : 'ASC'
        const orderBy = params.orderBy ? params.orderBy : 'title'

        const contents = await Content.findAndCountAll({
            attributes: ['id', 'title', ['body', 'content'], ['updatedAt', 'lastUpdate']],
            include: [{
                model: User,
                attributes: [['name', 'author']],
            }],

            where: {
                updatedAt: {
                    [Op.between]: [new Date(params.start), new Date(params.end)]
                }
            },
            limit: limit,
            offset: offset,
            order: [[`${orderBy}`, `${orientation}`]]
        })
        
        if (contents.rows.length) {
            allContents = contents.rows.map((row) => {
                return {
                    id: _.get(row, 'dataValues.id'),
                    title: _.get(row, 'dataValues.title'),
                    content: _.get(row, 'dataValues.content'),
                    lastUpdate: _.get(row, 'dataValues.lastUpdate'),
                    author:  _.get(row, 'User.dataValues.author')
                }
            })
            allContents = {
                counts: contents.count,
                rows: allContents
            }
        }
        return allContents
    }

    async retrieveContents (): Promise<RetrieveQuantityContentByAuthor.Result> {

        const contents = await Content.findAll({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('content.userId')), 'quantity']],
            include: [
                {
                    model: User,
                    attributes: [['name', 'authors']],
                    on: {
                        col1: Sequelize.where(Sequelize.col('User.id'), '=', Sequelize.col('content.userId')),
                    },
                },
            ],
            group: ['User.name'],
            raw: true,
        })


        const countContentsByAuthors = contents.map((row) => {
            return {
                quantity: _.get(row, 'quantity'),
                authors:  _.get(row, 'User.authors')
            }
        })
        return countContentsByAuthors as RetrieveQuantityContentByAuthor.Result
    }

}
