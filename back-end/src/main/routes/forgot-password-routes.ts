import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeForgotPasswordController } from '@/main/factories/controllers/forgot-password/forgot-password-controller-factory'

import { Router } from 'express'

export default (router: Router): void => {
    router.post('/forgot-password', adaptRoute(makeForgotPasswordController()))
}
