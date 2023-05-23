import { ValidationComposite, PathFileValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeRemoveFileValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    validations.push(new PathFileValidation())
    return new ValidationComposite(validations)
}
