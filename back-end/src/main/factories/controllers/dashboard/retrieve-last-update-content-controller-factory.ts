import { DbRetrieveLastUpdateContents } from '@/data/usecases/content/dashboard/db-retrieve-last-update-contents'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { RetrieveLastUpdateContentsController } from '@/presentation/controller/dashboard/retrieve-last-update-contents-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeRetrieveLastUpdateContentsController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbRetrieveLastUpdateContents = new DbRetrieveLastUpdateContents(contentMysqlRepository) 
    const controller = new RetrieveLastUpdateContentsController(dbRetrieveLastUpdateContents)
    return new LogControllerDecorator(controller, new LogError())
}