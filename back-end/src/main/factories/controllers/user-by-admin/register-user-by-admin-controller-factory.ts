import { RegisterUserByAdminController } from '@/presentation/controller/users/register-users-controller'
import { DbRegisterUserByAdmin } from '@/data/usecases/user-by-admin/db-register-user-admin' 
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { MailProviderAdapter } from '@/infra/providers/mail-provider-adapter' 
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter' 
import { makeRegisterAdminByAdminValidation } from './register-user-by-admin-validation-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'

export const makeRegisterAdminByAdminController = (): Controller => {
    const salt = 12
    const accountMysqlRepository = new AccountMysqlRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const mailProviderAdapter = new MailProviderAdapter()
    const dbRegisterUserByAdmin = new DbRegisterUserByAdmin(accountMysqlRepository, accountMysqlRepository, bcryptAdapter, mailProviderAdapter)
    const registerUserByAdminController = new RegisterUserByAdminController(dbRegisterUserByAdmin, makeRegisterAdminByAdminValidation())
    return new LogControllerDecorator(registerUserByAdminController, new LogError())
}