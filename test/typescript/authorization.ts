import { expect } from 'chai'
import * as dotenv from 'dotenv'
import { Marketplace } from '../../types/marketplace'
dotenv.config()

const appUid = process.env.APP_UID as string
export function authorization (marketplace: Marketplace) {
    describe('Authorization Apps api', () => {
        test('should get all authorization for apps', done => {
            marketplace.app(appUid).authorization().findAll()
            .then((response) => {
                expect(response).to.not.equal(undefined)
                done()
              })
              .catch(done)
        })
        test('should revoke all authorization for apps', done => {
            marketplace.app(appUid).authorization().revokeAll()
            .then((response) => {
                expect(response).to.not.equal(undefined)
                done()
              })
              .catch(done)
        })
    })
}