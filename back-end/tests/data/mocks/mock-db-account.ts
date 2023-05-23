import { LoadAccountByEmailRepository  } from '@/data/protocols/db/account/load-account-by-email-repository'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { CheckAccountByEmailRepository } from '@/data/protocols/db/account/check-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account'
import { LoadAccountByByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { v4 as uuidv4 } from 'uuid'
import { mockLoadAccountByEmail } from '@/tests/domain/mock-account'
export class AddAccountRepositorySpy implements AddAccountRepository {
    params: AddAccountRepository.Params
    result = true

    async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    email: string
    result = mockLoadAccountByEmail()

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByByIdRepository {
    id: string
    result = {
        id: uuidv4(),
        name: 'any_name',
        email: 'any_mail@gmail.com',
        role: 'any_role',
        status: 1,
    }

    async loadById (id: string): Promise<LoadAccountByByIdRepository.Result> {
        this.id = id
        return this.result
    }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {

    id: string
    role?: string
    status: number
    result = {
        id: uuidv4(),
        name: 'any_name',
        email: 'any_mail@gmail.com',
    }

    async loadByToken (id: string, status: number, role?: string): Promise<LoadAccountByTokenRepository.Result> {
        this.id = id
        this.role = role
        this.status = status
        return this.result
    }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email: string
    result = false

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}
