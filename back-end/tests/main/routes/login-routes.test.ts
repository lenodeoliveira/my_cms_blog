import { setupApp } from '@/main/config/app'

import { Express } from 'express'
import request from 'supertest'

let app: Express

describe('Login Routes', () => {
    beforeAll(async () => {
        app = await setupApp()
    })

    test('Should return an bad request if name is not passed', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                email: 'any@gmail.com',
                password: '12345678',
                passwordConfirmation: '12345678'
            })
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({ error: 'Misssing param: name' })
    })

    test('Should return an bad request if email is not passed', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'name',
                password: '12345678',
                passwordConfirmation: '12345678'
            })
        expect(res.body).toEqual({ error: 'Misssing param: email' })
    })

    test('Should return an bad request if password is not passed', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'name',
                email: 'any@gmail.com',
                passwordConfirmation: '12345678'
            })
        expect(res.body).toEqual({ error: 'Misssing param: password' })
    })

    test('Should return an bad request if password confirmation is not passed', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'name',
                email: 'any@gmail.com',
                password: '12345678',
            })
        expect(res.body).toEqual({ error: 'Misssing param: passwordConfirmation' })
    })
})
