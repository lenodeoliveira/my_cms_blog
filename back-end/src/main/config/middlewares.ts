import {Express } from 'express'
import { bodyParser, contentType, noCache,cors } from '../middlewares'
export default (app: Express): void => {
    app.use(bodyParser)
    app.use(contentType)
    app.use(noCache)
    app.use(cors)
}