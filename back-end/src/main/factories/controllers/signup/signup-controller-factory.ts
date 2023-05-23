import { SignUpController } from '@/presentation/controller/login/signup-controller'
import { DbAddAccount } from '@/data/usecases/account/db-add-account' 
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter' 
import { makeSignUpValidation } from './signup-validation-factory'
import { Controller } from '@/presentation/protocols/controller'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'

export const makeSignUpController = (): Controller => {
    const salt = 12
    const accountMysqlRepository = new AccountMysqlRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMysqlRepository, accountMysqlRepository)
    const singUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
    return new LogControllerDecorator(singUpController, new LogError())
}