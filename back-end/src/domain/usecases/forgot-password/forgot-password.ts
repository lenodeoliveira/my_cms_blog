export interface ForgotPassword {
  generateToken: (email: string, host?: string) => Promise<ForgotPassword.Result>
}

export namespace ForgotPassword {
  export type Result = {
    email: string
    passwordResetToken: string
  }
}