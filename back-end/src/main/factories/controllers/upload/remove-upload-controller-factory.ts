import { LogControllerDecorator } from '@/main/decorators/log'
import { RemoveFileUploadControler } from '@/presentation/controller/file-upload/remove-upload-controller'
import { Controller } from '@/presentation/protocols/controller'
import { Files } from '@/data/usecases/files/files'
import { LogError } from '@/utils/log-error/log-error'
import { makeRemoveFileValidation } from './remove-file-validation-factory'
import { FilesMysqlRepository } from '@/infra/db/mysqldb/files-mysql-repository'

export const makeRemoveUploadController = (): Controller => {
    const fileMysqlRepository = new FilesMysqlRepository()  
    const filesUtils = new Files(fileMysqlRepository)
    const removeFileValidation = makeRemoveFileValidation()
    const controller = new RemoveFileUploadControler(filesUtils, removeFileValidation)
    return new LogControllerDecorator(controller, new LogError())
}