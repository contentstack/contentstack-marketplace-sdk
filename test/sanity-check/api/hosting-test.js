import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader } from '../utility/fileOperations/readwrite.js'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

let apps = {}
const orgID = process.env.ORG_UID
let client = {}
let uploadUid = ''
let deploymentUid = ''
describe('Apps hosting api Test', () => {
  setup(() => {
    const user = jsonReader('loggedinAdmin.json')
    client = contentstackClient(user.authtoken)
    apps = jsonReader('apps.json')
  })

  it('test get apps hosting details', done => {
    const hosting = makeHosting(apps.uid)
    hosting.isEnable()
      .then((response) => {
        expect(response.enabled).to.not.equal(false)
        done()
      })
      .catch(done)
  })
})

function makeHosting (appUid) {
  return client.marketplace(orgID).app(appUid).hosting()
}
