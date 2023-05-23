import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeUpdateContentsValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'slug', 'body']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}