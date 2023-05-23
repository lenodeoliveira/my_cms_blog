import { DbRemoveContent } from '@/data/usecases/content/db-remove-content'
import { ContentMysqlRepository } from '@/infra/db/mysqldb/content-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'

import { RemoveContentController } from '@/presentation/controller/contents/remove-content-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeRemoveContentsController = (): Controller => {
    const contentMysqlRepository = new ContentMysqlRepository()
    const dbRemoveContent = new DbRemoveContent(contentMysqlRepository) 
    const controller = new RemoveContentController(dbRemoveContent)
    return new LogControllerDecorator(controller, new LogError())
}