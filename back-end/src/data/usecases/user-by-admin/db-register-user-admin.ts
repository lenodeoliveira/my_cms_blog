import { Hasher } from '@/data/protocols/cryptography'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account'
import { RegisterUserByAdminRepository } from '@/data/protocols/db/users-by-admin/register-users-by-admin-repository'
import { MailProvider } from '@/data/protocols/providers/mail-provider'
import { RegisterUserByAdmin } from '@/domain/usecases/users/register-users'

export class DbRegisterUserByAdmin implements RegisterUserByAdmin {

    constructor(
      private readonly registerUserByAdminRepository: RegisterUserByAdminRepository,
      private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
      private readonly hasher: Hasher,
      private readonly mailProvider: MailProvider
    ) {}

    async register (user: RegisterUserByAdmin.Params): Promise<boolean> {

        const exists = await this.checkAccountByEmailRepository.checkByEmail(user.email)
        let isValid = false

        if (!exists) {
            const hashedPassword = await this.hasher.hash(user.password)
            isValid = await this.registerUserByAdminRepository.registerUser({...user, password: hashedPassword})

            const replacements = {
                login: user.email,
                password: `${user.password}`
            }

            await this.mailProvider.sendMail({
                to: {
                    name: user.name,
                    email: user.email
                },
                from: {
                    name: 'Welcome email',
                    email: 'test@gmail.com'
                },
                subject: 'Be welcome',
                body: '<p>Bem-vindo ao gerenciador de conteúdo!</p><br><p>Seu login é {{login}} e sua senha de acesso é {{password}}. </p>',
                replacements
            })
        }
        return isValid
    }
}