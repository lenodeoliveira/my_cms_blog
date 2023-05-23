export interface ForgotPasswordRepository {
  generateToken: (email: string) => Promise<ForgotPasswordRepository.Result>
}

export namespace ForgotPasswordRepository {
  export type Result = {
    email: string
    passwordResetToken: string
  }
}