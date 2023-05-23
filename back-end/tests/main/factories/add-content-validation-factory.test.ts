import { makeAddContentsController } from '@/main/factories/controllers/content/add-content-controller-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddContentControllerValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeAddContentsController()
        const validations: Validation[] = []
        for (const field of ['title', 'slug', 'body']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
