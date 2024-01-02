import { expect } from 'chai';
import * as dotenv from 'dotenv'
import { ContentstackClient } from '../..';
dotenv.config()
 
export function login(client: ContentstackClient) { 
    describe('Contentstack Client Test', () => {
        test('should start Client initialization', done => {
            client.login({ email: process.env.EMAIL as string, password: process.env.PASSWORD as string }, { include_orgs: true, include_orgs_roles: true, include_stack_roles: true, include_user_settings: true })
            .then((response) => {
                expect(response.notice).to.be.equal('Login Successful.')
                expect(response.user.email).to.be.equal(process.env.EMAIL)                
                done();
            })
            .catch(done)
        })
    })
}

export var logout = (client: ContentstackClient) => describe('User logout test', () => {
    test('should logout the client', done => {
        client.logout()
        .then((response) => {
            expect(response.notice).to.be.equal(`You've logged out successfully.`)
            done()
        })
        .catch(done)
    })
} )

export function loginWithRegion(client: ContentstackClient) { 
    describe('Contentstack Client Test with Region', () => {
        test('Client initialization with Region', done => {
            client.login({ email: process.env.EMAIL as string, password: process.env.PASSWORD as string }, { include_orgs: true, include_orgs_roles: true, include_stack_roles: true, include_user_settings: true })
            .then((response) => {
                expect(response.notice).to.be.equal('Login Successful.')
                expect(response.user.email).to.be.equal(process.env.EMAIL)
                client.logout()
                done();
            })
            .catch(done)
        })
    })
}