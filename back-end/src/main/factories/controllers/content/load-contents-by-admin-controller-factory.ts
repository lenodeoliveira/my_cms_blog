import { DbLoadContentsByAdmin } from '@/data/usecases/content/db-load-contents-by-admin'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LoadContentsByAdminController } from '@/presentation/controller/contents/load-contents-by-admin-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeLoadContentsByAdminController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbLoadContentsByAdmin = new DbLoadContentsByAdmin(contentMysqlRepository) 
    const controller = new LoadContentsByAdminController(dbLoadContentsByAdmin)
    return new LogControllerDecorator(controller, new LogError())
}