import { MailProvider } from '@/data/protocols/providers/mail-provider'

export class MailProviderSpy implements MailProvider {
    message: MailProvider.Request

    async sendMail(message: MailProvider.Request): Promise<void> {
        this.message = message
    }

}


export const mockTemplateMail = (): MailProvider.Request => ({
    to: {
        name: 'any_name',
        email: 'any_email'
    },
    from: {
        name: 'any_name',
        email: 'any_email'
    },
    subject: 'any_subject',
    body: 'any_body'
})