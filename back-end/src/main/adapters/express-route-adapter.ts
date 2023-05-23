import { Controller } from '@/presentation/protocols/controller'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const file = req.files ? req.files[0] : {}
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {}),
            ...file,
            userId: req.userId,
            host: req.headers.host,
        }
        const httpResponse = await controller.handle(request)
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}

