import { RetrieveUserByAdminController } from '@/presentation/controller/users/retrieve-user-by-admin-controller'
import { DbRetrieveUserByAdmin } from '@/data/usecases/user-by-admin/db-retrieve-user-by-admin' 
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'

export const makeRetrieveUserByAdminController = (): Controller => {
    const accountMysqlRepository = new AccountMysqlRepository()
    const dbRetrieveUserByAdmin = new DbRetrieveUserByAdmin(accountMysqlRepository)
    const retrieveUserByAdminController = new RetrieveUserByAdminController(dbRetrieveUserByAdmin)
    return new LogControllerDecorator(retrieveUserByAdminController, new LogError())
}