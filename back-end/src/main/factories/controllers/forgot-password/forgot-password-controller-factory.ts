import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { makeForgotPasswordValidation } from './forgot-password-validation-factory'
import { DbForgotPassword } from '@/data/usecases/forgot-password/db-forgot-password'
import { MailProviderAdapter } from '@/infra/providers/mail-provider-adapter' 
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'
import { ForgotPasswordController } from '@/presentation/controller/forgot-password/forgot-password-controller'

export const makeForgotPasswordController = (): Controller => {
    const accountMysqlRepository = new AccountMysqlRepository()
    const mailProviderAdapter = new MailProviderAdapter()
    const dbForgotPassword = new DbForgotPassword(accountMysqlRepository, accountMysqlRepository, mailProviderAdapter)
    const singUpController = new ForgotPasswordController(dbForgotPassword, makeForgotPasswordValidation())
    return new LogControllerDecorator(singUpController, new LogError())
}