import { DbAddContent } from '@/data/usecases/content/db-add-content'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { AddContentController } from '@/presentation/controller/contents/add-content-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'
import { makeAddContentsValidation } from './add-content-validation-factory'

export const makeAddContentsController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbAddContent = new DbAddContent(contentMysqlRepository, contentMysqlRepository) 
    const controller = new AddContentController(makeAddContentsValidation(), dbAddContent)
    return new LogControllerDecorator(controller, new LogError())
}