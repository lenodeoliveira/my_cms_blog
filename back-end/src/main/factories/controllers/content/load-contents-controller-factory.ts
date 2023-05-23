import { DbLoadContents } from '@/data/usecases/content/db-load-contents'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LoadContentsController } from '@/presentation/controller/contents/load-contents-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeLoadContentsController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbLoadContent = new DbLoadContents(contentMysqlRepository) 
    const controller = new LoadContentsController(dbLoadContent)
    return new LogControllerDecorator(controller, new LogError())
}