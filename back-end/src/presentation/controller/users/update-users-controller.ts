import { UniqueConstraintError } from 'sequelize'
import { Controller } from '@/presentation/protocols/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { UpdateUserByAdmin } from '@/domain/usecases/users/update-user'
import { Validation } from '../../protocols/validation'
import { badRequest, forbidden, noContent, notFound, serverError } from '@/presentation/helpers/http/http-helpers'
import { EmailInUseError } from '@/presentation/errors'

export class UpdateUserByAdminController implements Controller {
    constructor (
    private readonly updateUserByAdmin: UpdateUserByAdmin,
    private readonly validation: Validation,
    ) {}

    async handle (request: UpdateUserByAdminController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if(error) {
                return badRequest(error)
            }
            const isValid = await this.updateUserByAdmin.updateUserByAdmin(request)

            if (!isValid) {
                return notFound(new Error('User not exists'))
            }

            return noContent()
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return forbidden(new EmailInUseError())
            }
            return serverError(error)
        }
    }
}


export namespace UpdateUserByAdminController {
  export type Request = {
    id: string
    name: string
    email?: string
    status?: number
    role?: string
  }
}