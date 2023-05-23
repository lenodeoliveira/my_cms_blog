import { ValidationComposite, FileValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeFileValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    validations.push(new FileValidation())
    return new ValidationComposite(validations)
}
