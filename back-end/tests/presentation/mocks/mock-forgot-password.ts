import {ForgotPassword} from '@/domain/usecases/forgot-password/forgot-password'
import { mockForgotPassword } from '@/tests/domain/mock-account'

export class ForgotPasswordSpy implements  ForgotPassword {
    email: string
    host?: string
    result = mockForgotPassword()
  
    async generateToken(email: string, host?: string): Promise<ForgotPassword.Result> {
        this.email = email
        this.host = host
        return this.result
    }
}