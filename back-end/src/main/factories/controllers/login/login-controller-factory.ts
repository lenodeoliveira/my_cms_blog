import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/cryptography'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter' 
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository' 
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '@/presentation/protocols/controller'
import { DbAuthentication } from '@/data/usecases/account/db-authentication'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogError } from '@/utils/log-error/log-error'
import { LoginController } from '@/presentation/controller/login/login-controller'

export const makeLoginController = (): Controller => {
    const secret = env.jwtSecret
    const salt = 12
    const accountMysqlRepository = new AccountMysqlRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(secret)
    const dbAuthentication = new DbAuthentication(accountMysqlRepository, bcryptAdapter, jwtAdapter)
    const singUpController = new LoginController(makeLoginValidation(), dbAuthentication)
    return new LogControllerDecorator(singUpController, new LogError())
}