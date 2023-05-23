import { UsersByAdminController } from '@/presentation/controller/users/user-by-admin-controller'
import { DbFindUsersByAdmin } from '@/data/usecases/user-by-admin/db-find-users-by-admin'
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository'

export const makeFindUsersByAdminController = (): Controller => {
    const accountMysqlRepository = new AccountMysqlRepository()
    const dbFindUsersByAdmin = new DbFindUsersByAdmin(accountMysqlRepository)
    const usersByAdminController = new UsersByAdminController(dbFindUsersByAdmin)
    return new LogControllerDecorator(usersByAdminController, new LogError())
}