export interface MailProvider {
  sendMail(message: MailProvider.Request): Promise<void>
}

export namespace MailProvider {
  export type Request = {
    to: IAddress
    from: IAddress
    subject: string
    body: string,
    replacements?: any
  }
}

interface IAddress {
  email: string
  name: string
}

