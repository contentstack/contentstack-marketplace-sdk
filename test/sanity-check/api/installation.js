import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader } from '../utility/fileOperations/readwrite.js'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

const orgID = process.env.ORG_UID
const apiKey = process.env.API_KEY
let client = {}
let apps = {}

describe('Apps api Test', () => {
  setup(() => {
    const user = jsonReader('loggedinAdmin.json')
    client = contentstackClient(user.authtoken)
    apps = jsonReader('apps.json')
  })
  it('should get all the users', async () => {
    const response = await makeInstallation().installation().getInstalledUsers()
    expect(response.data).to.be.an('array')
  })
  it('should get all the stacks', async () => {
    const response = await makeInstallation().installation().getInstalledStacks()
    expect(response.data).to.be.an('array')
  })

  it('should get all the apps', async () => {
    const response = await makeInstallation().installation().getInstalledApps()
    expect(response.data).to.be.an('array')
  })
  it('should get all the apps installed on a specific stack', async () => {
    const response = await makeInstallation().installation().getInstalledApps({
      target_uid: apiKey
    })
    expect(response.data).to.be.an('array')
  })
})
function makeInstallation () {
    return client.marketplace(orgID)
  }
