import { DbLoadContent } from '@/data/usecases/content/db-load-content'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LoadContentController } from '@/presentation/controller/contents/load-content-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeLoadContentController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbLoadContent = new DbLoadContent(contentMysqlRepository) 
    const controller = new LoadContentController(dbLoadContent)
    return new LogControllerDecorator(controller, new LogError())
}