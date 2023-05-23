import { UpdateUserByAdminController } from '@/presentation/controller/users/update-users-controller'
import { DbUpdateUserByAdmin } from '@/data/usecases/user-by-admin/db-update-user-admin' 
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { makeUpdateUserByAdminValidation } from './update-user-by-admin-validation-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'

export const makeUpdateAdminByAdminController = (): Controller => {
    const accountMysqlRepository = new AccountMysqlRepository()
    const dbUpdateUserByAdmin = new DbUpdateUserByAdmin(accountMysqlRepository, accountMysqlRepository)
    const updateUserByAdminController = new UpdateUserByAdminController(dbUpdateUserByAdmin, makeUpdateUserByAdminValidation())
    return new LogControllerDecorator(updateUserByAdminController, new LogError())
}