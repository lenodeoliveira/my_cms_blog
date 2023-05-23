import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography'
import { AuthMiddleware } from '@/presentation/middlwares/auth-middleware'
import { Middleware } from '@/presentation/protocols/middleware'
import env from '@/main/config/env'
import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository'

export const makeAuthMiddleware = (status: number, role?: string, ): Middleware => {
    const secret = env.jwtSecret
    const jwtAdapter = new JwtAdapter(secret)
    const accountMysqlRepository = new AccountMysqlRepository()
    const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdapter, accountMysqlRepository)
    const middleware = new AuthMiddleware(dbLoadAccountByToken, status, role)
    return middleware
}