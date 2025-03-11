import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader } from '../utility/fileOperations/readwrite'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

let apps = {}
let installation = {}
const orgID = process.env.ORG_UID
let client = {}

describe('Apps api Test', () => {
  setup(() => {
    const user = jsonReader('loggedinAdmin.json')
    client = contentstackClient(user.authtoken)
    apps = jsonReader('apps.json')
    installation = jsonReader('installation.json')
  })

  it('Uninstall installation test', done => {
    client.marketplace(orgID).installation(installation.installation_uid).uninstall()
      .then((installation) => {
        expect(installation).to.deep.equal({})
        done()
      }).catch(done)
  })

  it('Delete app test', done => {
    client.marketplace(orgID).app(apps.uid).delete()
      .then((appResponse) => {
        expect(appResponse).to.deep.equal({})
        done()
      })
      .catch(done)
  })
})
