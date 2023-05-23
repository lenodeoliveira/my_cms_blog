import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'

export const mockUser = (): FindUserByAdmin.Result => ({
    count: 2,
    rows:  [
        {
            id: 'any_id',
            name: 'any_name',
            email: 'any_mail@mail.com',
            status: 1,
            role: 'any_role',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 'any_id',
            name: 'any_name',
            email: 'any_mail@mail.com',
            status: 1,
            role: 'any_role',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]
})
