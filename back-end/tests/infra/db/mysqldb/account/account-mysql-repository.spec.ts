import { AccountMysqlRepository } from '@/infra/db/mysqldb/account-mysql-repository'
import { User } from '@/infra/db/mysqldb/entities/users'
import { mockAddAccountParams } from '@/tests/domain/mock-account'


describe('AccountMysqlRepository', () => {
    const makeSut = (): AccountMysqlRepository => {
        return new AccountMysqlRepository()
    }

    describe('add', () => {
        test('Should return true if the account is successfully added', async () => {
            const mockCreate = jest.fn((): any => mockAddAccountParams())
            jest.spyOn(User, 'create')
                .mockImplementation(() => mockCreate())

            const sut = makeSut()
            const isValid = await sut.add(mockAddAccountParams())
            expect(isValid).toBeTruthy()

        })

        test('Should return an account with the email passed', async () => {
            const mockLoadUser = jest.fn((): any => ({
                id: 'any_id',
                name: 'any_name',
                email: 'any_email@gmail.com',
                password: 'any_password'}))

            jest.spyOn(User, 'findOne')
                .mockImplementation(() => mockLoadUser())

            const sut = makeSut()
            const user = await sut.loadByEmail('any_email@gmail.com')
            expect(user.id).toBe('any_id')
            expect(user.name).toBe('any_name')
            expect(user.email).toBe('any_email@gmail.com')
            expect(user.password).toBe('any_password')

        })
    })
})