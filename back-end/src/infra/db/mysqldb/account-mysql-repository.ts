import { CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository } from '@/data/protocols/db/account'
import { LoadAccountByByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { ForgotPasswordRepository } from '@/data/protocols/db/forgot-password/forgot-password-repository'
import { FindUsersByAdminRepository } from '@/data/protocols/db/users-by-admin/find-users-by-admin-repository'
import { RegisterUserByAdminRepository } from '@/data/protocols/db/users-by-admin/register-users-by-admin-repository'
import { RetrieveUserByAdminRepository } from '@/data/protocols/db/users-by-admin/retrieve-user-by-admin-repository'
import { UpdateUserByAdminRepository } from '@/data/protocols/db/users-by-admin/update-users-by-admin-repository'
import { FindUserByAdmin } from '@/domain/usecases/users/users-by-admin'
import { ResetPasswordRepository } from '@/data/protocols/db/reset-password/reset-password'
import { User } from './entities/users'
import crypto from 'crypto'
export class AccountMysqlRepository implements 
AddAccountRepository, 
LoadAccountByEmailRepository, 
CheckAccountByEmailRepository, 
RegisterUserByAdminRepository, 
LoadAccountByByIdRepository, 
UpdateUserByAdminRepository, 
FindUsersByAdminRepository, 
RetrieveUserByAdminRepository,
ForgotPasswordRepository,
ResetPasswordRepository {

    async add (data: AddAccountRepository.Params): Promise<boolean> {
        await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })
        return true
    }

    async registerUser (data: RegisterUserByAdminRepository.Params): Promise<boolean> {
        await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            status: data.status
        })
        return true
    }

    async checkByEmail (email: string): Promise<boolean> {
        const user = await User.findAll({
            attributes: [
                'name'
            ],
            where: {
                email: email
            }
        })
        return user.length !== 0
    }

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const user = await User.findOne({
            where: {
                email: email,
                status: 1,
            }
        })
        return user
    }

    async loadByToken (id: string, status: number, role?: string): Promise<LoadAccountByTokenRepository.Result> {
        let user 
        if(role) {
            user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: id,
                    status: status,
                    role: role,

                }
            })
        } else {
            user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: id,
                    status: status,
                }
            })
        }
        
        return user
    }

    async loadById (id: string): Promise<LoadAccountByByIdRepository.Result> {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email', 'role', 'status'],
            where: {
                id: id
            }
        })

        return user
    }

    async updateUser (data: UpdateUserByAdminRepository.Params): Promise<boolean> {
        const response = await User.update({
            name: data.name,
            email: data.email,
            status: data.status,
            role: data.role,

        }, {
            where: {
                id: data.id
            }
        })
        
        return response ? true : false
    }

    async findUsers (data: FindUserByAdmin.Params): Promise<FindUserByAdmin.Result> {
        const reqOffSet = Number(data.page)
        const reqLimit = Number(data.limit)

        const offset =  isNaN(reqOffSet) ? 1 : reqOffSet
        const limit = isNaN(reqLimit) ? 50 : reqLimit


        const users = await User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                'id',
                'name',
                'email',
                'status',
                'role',
                'createdAt',
                'updatedAt',
            ],
            order: [
                ['name', 'DESC']
            ]
        })
        return users
    }
 
    async retrieveUser (id: string): Promise<RetrieveUserByAdminRepository.Result> {
        return await User.findOne({
            where: {
                id: id
            },
            attributes: [
                'id',
                'name',
                'email',
                'status',
                'role',
                'createdAt',
                'updatedAt',
            ],
        })
    }

    async generateToken (email: string): Promise<ForgotPasswordRepository.Result> {
        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date()

        now.setHours(now.getHours() + 1)
        await User.update({
            passwordResetToken: token,
            passwordResetExpires: now
        }, {
            where: {
                email: email
            }
        })
        return {
            email,
            passwordResetToken: token
        }
    }

    async resetPassword (data: ResetPasswordRepository.Params): Promise<boolean> {
        
        const response = await User.update({
            password: data.password,
        }, {
            where: {
                email: data.email
            }
        })
        return response ? true : false
    }
}

 