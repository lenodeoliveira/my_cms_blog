import { AddAccount } from '@/domain/usecases/add-account'
import { Authentication } from '@/domain/usecases/authentication'
import { RegisterUserByAdmin } from '@/domain/usecases/users/register-users'
import { UpdateUserByAdmin } from '@/domain/usecases/users/update-user'
import { RetrieveUserByAdmin } from '@/domain/usecases/users/retrieve-user'
import { ForgotPassword } from '@/domain/usecases/forgot-password/forgot-password'

export const mockAddAccountParams = (): AddAccount.Params => ({
    name: 'any_name',
    email:  'any_email@mail.com',
    password: 'any_password'
})

export const mockAuthenticationParams = (): Authentication.Params => ({
    email: 'any_email@mail.com',
    password:  'any_password'
})


export const mockRegisterUserByAdmin = (): RegisterUserByAdmin.Params => ({
    name: 'any_name',
    email:  'any_email@mail.com',
    password: 'any',
    status: 1,
    role: 'any_role'
})

export const mockUpdateUserByAdmin = (): UpdateUserByAdmin.Params => ({
    id: 'any_id',
    name: 'any_name',
    status: 1,
    role: 'any_role'
})

export const mockRetrieveUserByAdmin = (): RetrieveUserByAdmin.Result => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_mail@gmail.com',
    status: 1,
    role: 'any_role',
    createdAt: new Date(),
    updatedAt: new Date()
})

export const mockForgotPassword = (): ForgotPassword.Result => ({
    email: 'any_mail@mail.com',
    passwordResetToken: 'any_token'
})


export const mockLoadAccountByEmail = (): any => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_mail@gmail.com',
    password: 'any_password',
    passwordResetToken: 'any_reset_token',
    passwordResetExpires: new Date()
})



