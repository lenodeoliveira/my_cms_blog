import { ServerError } from '@/presentation/errors/server-error'
import { RequestHandler } from 'express'
import multerConfig from '@/main/config/multer-config'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
    const upload = multer(multerConfig).array('image', 1)
    upload(req, res, error => {
        // if (error !== undefined) {
        //     return res.status(500).json({ error: new ServerError(error).message })
        // }
        next()
    })
}