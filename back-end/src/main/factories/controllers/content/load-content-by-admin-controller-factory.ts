import { DbLoadContentByAdmin } from '@/data/usecases/content/db-load-content-by-admin'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LoadContentByAdminController } from '@/presentation/controller/contents/load-content-by-admin-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeLoadContentByAdminController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbLoadContentByAdmin = new DbLoadContentByAdmin(contentMysqlRepository) 
    const controller = new LoadContentByAdminController(dbLoadContentByAdmin)
    return new LogControllerDecorator(controller, new LogError())
}