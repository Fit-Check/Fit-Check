const supertest = require('supertest');
const { describe, it, beforeAll, expect, xdescribe } = require('@jest/globals');
const authRoutes = require('../server/routes/authRoutes');
const { testFlowVersion } = require('eslint-plugin-react/lib/util/version');

const server = 'http://localhost:3000'

describe('loads index.html file', () => {
    it('responds with a 200 status and index.html file', () => {
        return supertest(server)
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeDefined()
            })
            
    })
})

describe('signup test', () => {
    it('responds with a 200 status and creates a user', () => {
        const body = {
            username: 'test',
            firstname: 'test1',
            lastname: 'test2',
            password: '123',
            email: 'test@gmail.com'
        };
        return supertest(server)
            .post('/signup')
            .send(body)
            .expect('Content-Type', /application\/json/)
            .expect((res) => {
                expect(res.body).toBeDefined();
                //expect(res.locals).toBeDefined();
                expect(res.body.username).toEqual('test');
                //expect(res.body.id).toBeDefined();
            })
            .expect(200)
    })
})
describe('test home route', () => {
    it('responds with a 400 status if the user does not exist', () => {
        const body = {
            username: 'falsetest',
            password: '123',
            firstname: 'test1',
            lastname: 'test2',
            email: 'test@gmail.com'
        };
        return supertest(server)
        .post('/login')
        .send(body)
        .expect(400)
    })
})