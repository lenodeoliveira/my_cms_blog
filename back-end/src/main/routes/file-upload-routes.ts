import { adaptRoute, /*adaptMulter as upload*/} from '@/main/adapters'
import { makeUploadController } from '@/main/factories/controllers/upload/upload-controller-factory'
import { makeRemoveUploadController } from '@/main/factories/controllers/upload/remove-upload-controller-factory'
import { makeLoadFilesController } from '@/main/factories/controllers/upload/load-file-controller-factory'
import { adaptMiddleware, adaptMulter as upload } from '../adapters'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware(1, 'admin'))
    router.post('/upload', adminAuth, upload, adaptRoute(makeUploadController()))
    router.delete('/upload/:image', adminAuth, adaptRoute(makeRemoveUploadController()))
    router.get('/upload/files', adaptRoute(makeLoadFilesController()))
}
