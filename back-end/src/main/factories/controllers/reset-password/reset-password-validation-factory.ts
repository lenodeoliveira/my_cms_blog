import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeResetPasswordValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['code', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    return new ValidationComposite(validations)
}
