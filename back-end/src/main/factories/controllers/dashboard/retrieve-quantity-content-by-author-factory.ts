import { DbRetrieveQuantityContentByAuthor } from '@/data/usecases/content/dashboard/db-retrieve-quantity-content-by-author'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { RetrieveQuantityContentByAuthorController } from '@/presentation/controller/dashboard/retrieve-quantity-content-by-author-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeRetrieveQuantityContentByAuthorController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbRetrieveQuantityContentByAuthor = new DbRetrieveQuantityContentByAuthor(contentMysqlRepository) 
    const controller = new RetrieveQuantityContentByAuthorController(dbRetrieveQuantityContentByAuthor)
    return new LogControllerDecorator(controller, new LogError())
}