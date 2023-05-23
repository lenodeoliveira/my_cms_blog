import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeResetPasswordController } from '@/main/factories/controllers/reset-password/reset-password-controller-factory'

import { Router } from 'express'

export default (router: Router): void => {
    router.post('/reset-password', adaptRoute(makeResetPasswordController()))
}
