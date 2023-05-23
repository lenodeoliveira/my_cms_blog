import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeRegisterAdminByAdminController } from '@/main/factories/controllers/user-by-admin/register-user-by-admin-controller-factory'
import { makeUpdateAdminByAdminController } from '@/main/factories/controllers/user-by-admin/update-user-by-admin-controller-factory'
import { makeFindUsersByAdminController } from '@/main/factories/controllers/user-by-admin/find-users-by-admin/find-users-by-admin-controller-factory'
import { makeRetrieveUserByAdminController } from '@/main/factories/controllers/user-by-admin/retrieve-user-by-admin/retrieve-user-by-admin-controller-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware(1, 'admin'))
    router.post('/register/auth/users', adminAuth, adaptRoute(makeRegisterAdminByAdminController()))
    router.put('/register/auth/users/:id', adminAuth, adaptRoute(makeUpdateAdminByAdminController()))
    router.get('/register/auth/users', adminAuth, adaptRoute(makeFindUsersByAdminController()))
    router.get('/register/auth/users/:id', adminAuth, adaptRoute(makeRetrieveUserByAdminController()))
}

