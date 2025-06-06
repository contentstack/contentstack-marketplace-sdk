import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader } from '../utility/fileOperations/readwrite.js'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

const orgID = process.env.ORG_UID
let client = {}
let apps = {}
let authorizationUid = ''

describe('Apps authorization test', () => {
  setup(() => {
    const user = jsonReader('loggedinAdmin.json')
    client = contentstackClient(user.authtoken)
    apps = jsonReader('apps.json')
  })

  it('fetch all authorization apps test', done => {
    client.marketplace(orgID).app(apps.uid).authorization().findAll()
      .then((response) => {
        expect(response).to.not.equal(null)
        done()
      })
      .catch(done)
  })

  it('revoke all authorization apps test', done => {
    client.marketplace(orgID).app(apps.uid).authorization().revokeAll()
      .then((response) => {
        expect(response).to.not.equal(null)
        done()
      })
      .catch(done)
  })

  it('revoke authorization apps test with uid', done => {
    client.marketplace(orgID).app(apps.uid).authorization().revoke(authorizationUid)
      .then((response) => {
        expect(response).to.not.equal(null)
        done()
      })
      .catch(done)
  })
})
