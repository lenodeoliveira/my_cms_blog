import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware(1, null))
    router.get('/validate-token-jwt', adminAuth, (req, res) => {
        res.status(200).json('Valid token and user is active!')
    })
}

