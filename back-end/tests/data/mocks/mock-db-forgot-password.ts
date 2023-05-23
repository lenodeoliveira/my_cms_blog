import {ForgotPasswordRepository} from '@/data/protocols/db/forgot-password/forgot-password-repository'
import { mockForgotPassword } from '@/tests/domain/mock-account'

export class ForgotPasswordRepositorySpy implements ForgotPasswordRepository {
    email: string
    result = mockForgotPassword()

    async generateToken (email: string): Promise<ForgotPasswordRepository.Result> {
        this.email = email
        return this.result
    }
}