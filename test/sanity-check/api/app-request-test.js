import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader } from '../utility/fileOperations/readwrite.js'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

let apps = {}
const orgID = process.env.ORG_UID
let clientUser = {}
let clientAdmin = {}
let requestUID = ''
describe('Apps request api Test', () => {
  setup(() => {
    const user = jsonReader('loggedinuser.json')
    const admin = jsonReader('loggedinAdmin.json')
    clientUser = contentstackClient(user.authtoken)
    clientAdmin = contentstackClient(admin.authtoken)
    apps = jsonReader('apps.json')
  })

  it('test create app request', done => {
    clientUser.marketplace(orgID).appRequests()
      .create({ appUid: apps.uid, targetUid: orgID })
      .then((response) => {
        requestUID = response.data.uid
        expect(response.data).to.not.equal(undefined)
        done()
      })
      .catch(done)
  })

  it('test get all request for oranization', done => {
    clientAdmin.marketplace(orgID).appRequests()
      .findAll()
      .then((response) => {
        expect(response.data).to.not.equal(undefined)
        done()
      })
      .catch(done)
  })

  it('test delete app request', done => {
    clientAdmin.marketplace(orgID).appRequests()
      .delete(requestUID)
      .then((response) => {
        expect(response).to.be.an('object')
        done()
      })
      .catch(done)
  })
})
