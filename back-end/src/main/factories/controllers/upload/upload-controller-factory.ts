import { DbAddFile } from '@/data/usecases/files/db-add-file'
import { FilesMysqlRepository } from '@/infra/db/mysqldb/files-mysql-repository'
import { LogControllerDecorator } from '@/main/decorators/log'
import { FileUploadController } from '@/presentation/controller/file-upload/file-upload-controller'
import { Controller } from '@/presentation/protocols/controller'
import { LogError } from '@/utils/log-error/log-error'
import { makeFileValidation } from './upload-validation-factory'

export const makeUploadController = (): Controller => {
    const fileValidation = makeFileValidation() 

    const fileMysqlRepository = new FilesMysqlRepository()
    const dbAddFile = new DbAddFile(fileMysqlRepository)
    const controller = new FileUploadController(dbAddFile, fileValidation)
    
    return new LogControllerDecorator(controller, new LogError())
}