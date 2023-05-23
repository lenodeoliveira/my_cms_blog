import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { makeResetPasswordValidation } from './reset-password-validation-factory'
import { DbResetPassword } from '@/data/usecases/reset-password/db-reset-password'
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'
import { ResetPasswordController } from '@/presentation/controller/reset-password/reset-password-controller'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeResetPasswordController = (): Controller => {
    const salt = 12
    const accountMysqlRepository = new AccountMysqlRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbResetPassword = new DbResetPassword(accountMysqlRepository, accountMysqlRepository, bcryptAdapter)
    const resetPasswordController = new ResetPasswordController(dbResetPassword, makeResetPasswordValidation())
    return new LogControllerDecorator(resetPasswordController, new LogError())
}