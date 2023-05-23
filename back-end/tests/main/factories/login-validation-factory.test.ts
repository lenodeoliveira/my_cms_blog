import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('@/validation/validators/validation-composite')

describe('LoginControllerValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeLoginController()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
