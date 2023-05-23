import { DbLoadFile } from '@/data/usecases/files/db-load-files'
import { FilesMysqlRepository } from '@/infra/db/mysqldb/files-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LoadFilesController } from '@/presentation/controller/file-upload/load-files-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'

export const makeLoadFilesController = (): Controller => {
    const filesMysqlRepository = new FilesMysqlRepository()
    const dbLoadFiles = new DbLoadFile(filesMysqlRepository) 
    const controller = new LoadFilesController(dbLoadFiles)
    return new LogControllerDecorator(controller, new LogError())
}