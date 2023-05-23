import { makeUpdateUserByAdminValidation } from '@/main/factories/controllers/user-by-admin/update-user-by-admin-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('makeUpdateAdminByAdminValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeUpdateUserByAdminValidation()
        const validations: Validation[] = []
        for (const field of ['name']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
