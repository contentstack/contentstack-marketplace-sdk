import { expect } from 'chai'
import * as dotenv from 'dotenv'
import { AppRequest } from '../../types/marketplace/apprequest'
dotenv.config()
let requestUID = ''

export function orgAppRequest (request: AppRequest) {
    describe('Org App request api', () => {
        test('should get all request for oranization', done => {
            request
              .findAll()
              .then((response) => {
                requestUID = response.data[0].uid
                expect(response.data).to.not.equal(undefined)
                done()
              })
              .catch(done)
        })
        
        test('should delete app request', done => {
          request
            .delete(requestUID)
            .then((response) => {
            expect(response.data).to.not.equal(undefined)
            done()
            })
            .catch(done)
        })
        
        test('should create app request', done => {
            request
              .create({ appUid: process.env.APP_UID as string, targetUid: process.env.APIKEY as string})
              .then((response) => {
                requestUID = response.data.data.uid
                expect(response.data).to.not.equal(undefined)
                done()
              })
              .catch(done)
        })
    })
}
