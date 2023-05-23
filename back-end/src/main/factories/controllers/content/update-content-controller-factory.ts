import { DbUpdateContent } from '@/data/usecases/content/db-update-content'
import { DbFindContentById } from '@/data/usecases/content/db-find-content-by-id'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { UpdateContentController } from '@/presentation/controller/contents/update-content-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'
import { makeUpdateContentsValidation } from './update-content-controller-validation-factory'

export const makeUpdateContentController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbUpdateContent = new DbUpdateContent(contentMysqlRepository, contentMysqlRepository) 
    const dbFindContentById = new DbFindContentById(contentMysqlRepository)
    const controller = new UpdateContentController(dbUpdateContent, dbFindContentById, makeUpdateContentsValidation())
    return new LogControllerDecorator(controller, new LogError())
}