import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddContentsController } from '@/main/factories/controllers/content/add-content-controller-factory'
import { makeLoadContentsController } from '@/main/factories/controllers/content/load-contents-controller-factory'
import { makeLoadContentController } from '@/main/factories/controllers/content/load-content-controller-factory'
import { makeUpdateContentController } from '@/main/factories/controllers/content/update-content-controller-factory'
import { makeRemoveContentsController } from '@/main/factories/controllers/content/remove-content-controller-factory'
import { makeLoadContentsByAdminController } from '@/main/factories/controllers/content/load-contents-by-admin-controller-factory'
import { makeLoadContentByAdminController } from '@/main/factories/controllers/content/load-content-by-admin-controller-factory'
import { makeRetrieveLastUpdateContentsController } from '@/main/factories/controllers/dashboard/retrieve-last-update-content-controller-factory'
import { makeRetrieveQuantityContentByAuthorController } from '@/main/factories/controllers/dashboard/retrieve-quantity-content-by-author-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware(1, 'admin'))
    router.get('/contents/:slug', adaptRoute(makeLoadContentController()))
    router.put('/contents/:id', adminAuth, adaptRoute(makeUpdateContentController()))
    router.delete('/contents/:id', adminAuth, adaptRoute(makeRemoveContentsController()))
    router.get('/contents', adaptRoute(makeLoadContentsController()))
    router.post('/contents', adminAuth, adaptRoute(makeAddContentsController()))
    router.get('/contents-by-admin', adminAuth, adaptRoute(makeLoadContentsByAdminController()))
    router.get('/contents-by-admin/:id', adminAuth, adaptRoute(makeLoadContentByAdminController()))
    router.get('/contents/dashboard/last-update', adminAuth, adaptRoute(makeRetrieveLastUpdateContentsController()))
    router.get('/contents/dashboard/count-by-authors', adminAuth, adaptRoute(makeRetrieveQuantityContentByAuthorController()))
}
