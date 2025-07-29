import dotenv from 'dotenv'
import { describe, it, setup } from 'mocha'
import { jsonReader, jsonWrite } from '../utility/fileOperations/readwrite.js'
import { contentstackClient } from '../utility/ContentstackClient.js'
import { expect } from 'chai'

dotenv.config()

// let stack = {}
const orgID = process.env.ORG_UID
let client = {}
let appUid = ''
let installationUid = ''
const app = {
  name: 'mp sdk testing app',
  description: 'My new test app',
  target_type: 'organization'
}
const config = { redirect_uri: 'https://example.com/oauth/callback', app_token_config: { enabled: true, scopes: ['scim:manage'] }, user_token_config: { enabled: true, scopes: ['user:read', 'user:write', 'scim:manage'], allow_pkce: true } }

describe('Apps api Test', () => {
  setup(() => {
    const user = jsonReader('loggedinAdmin.json')
    client = contentstackClient(user.authtoken)
  })

  it('Create app test', done => {
    client.marketplace(orgID).app().create(app)
      .then((appResponse) => {
        appUid = appResponse.uid
        jsonWrite(appResponse, 'apps.json')
        expect(appResponse.uid).to.not.equal(undefined)
        expect(appResponse.name).to.be.equal(app.name)
        expect(appResponse.description).to.be.equal(app.description)
        expect(appResponse.target_type).to.be.equal(app.target_type)
        done()
      })
      .catch(done)
  })

  it('Fetch all apps test', done => {
    client.marketplace(orgID).findAllApps()
      .then((apps) => {
        for (const index in apps.items) {
          const appObject = apps.items[index]
          expect(appObject.name).to.not.equal(null)
          expect(appObject.uid).to.not.equal(null)
          expect(appObject.target_type).to.not.equal(null)
        }
        done()
      })
      .catch(done)
  })

  it('Fetch all authorized apps test', done => {
    client.marketplace(orgID).findAllAuthorizedApps()
      .then((apps) => {
        for (const index in apps.data) {
          const appObject = apps.data[index]
          expect(appObject.name).to.not.equal(null)
          expect(appObject.uid).to.not.equal(null)
          expect(appObject.target_type).to.not.equal(null)
        }
        done()
      })
      .catch(done)
  })

  it('Fetch app test', done => {
    client.marketplace(orgID).app(appUid).fetch()
      .then((appResponse) => {
        expect(appResponse.uid).to.be.equal(appUid)
        expect(appResponse.name).to.be.equal(app.name)
        expect(appResponse.description).to.be.equal(app.description)
        expect(appResponse.target_type).to.be.equal(app.target_type)
        done()
      })
      .catch(done)
  })

  it('Install app test', done => {
    client.marketplace(orgID).app(appUid).install({ targetType: 'organization', targetUid: orgID })
      .then((installation) => {
        installationUid = installation.installation_uid
        jsonWrite(installation, 'installation.json')
        expect(installation.installation_uid).to.not.equal(undefined)
        expect(installation.params.organization_uid).to.be.equal(orgID)
        expect(installation.urlPath).to.be.equal(`/installations/${installation.installation_uid}`)
        expect(installation.fetch).to.not.equal(undefined)
        expect(installation.update).to.not.equal(undefined)
        expect(installation.uninstall).to.not.equal(undefined)
        done()
      })
      .catch(done)
  })

  it('Update app test', done => {
    const updateApp = { name: 'mp app name' }
    let appObject = client.marketplace(orgID).app(appUid)
    appObject = Object.assign(appObject, updateApp)
    appObject.update()
      .then((appResponse) => {
        expect(appResponse.uid).to.not.equal(undefined)
        expect(appResponse.name).to.be.equal(updateApp.name)
        expect(appResponse.description).to.be.equal(app.description)
        expect(appResponse.target_type).to.be.equal(app.target_type)
        done()
      })
      .catch(done)
  })

  it('Update OAuth app test', done => {
    client.marketplace(orgID).app(appUid).oauth().update({ config })
      .then((appResponse) => {
        expect(appResponse.redirect_uri).to.be.equal(config.redirect_uri)
        expect(appResponse.app_token_config.enabled).to.be.equal(config.app_token_config.enabled)
        expect(appResponse.user_token_config.enabled).to.be.equal(config.user_token_config.enabled)
        done()
      })
      .catch(done)
  })

  it('Fetch OAuth app test', done => {
    client.marketplace(orgID).app(appUid).oauth().fetch()
      .then((appResponse) => {
        expect(appResponse.redirect_uri).to.be.equal(config.redirect_uri)
        expect(appResponse.app_token_config.enabled).to.be.equal(config.app_token_config.enabled)
        expect(appResponse.user_token_config.enabled).to.be.equal(config.user_token_config.enabled)
        done()
      })
      .catch(done)
  })

  it('Get installationData for installation test', done => {
    client.marketplace(orgID).installation(installationUid).installationData()
      .then((installation) => {
        expect(installation).to.not.equal(null)
        done()
      }).catch(done)
  })

  it('Get configuration for installation test', done => {
    client.marketplace(orgID).installation(installationUid).configuration()
      .then((config) => {
        expect(config).to.not.equal(null)
        done()
      }).catch(done)
  })
  it('Set configuration for installation test', done => {
    client.marketplace(orgID).installation(installationUid).setConfiguration({})
      .then((config) => {
        expect(config.data).to.deep.equal({})
        done()
      }).catch(done)
  })
  it('Get server config for installation test', done => {
    client.marketplace(orgID).installation(installationUid).serverConfig()
      .then((config) => {
        expect(config).to.not.equal(null)
        done()
      }).catch(done)
  })
  it('Set server config for installation test', done => {
    client.marketplace(orgID).installation(installationUid).setServerConfig({})
      .then((config) => {
        expect(config.data).to.deep.equal({})
        done()
      }).catch(done)
  })

  it('Fetch installation test', done => {
    client.marketplace(orgID).installation(installationUid).fetch()
      .then((installation) => {
        expect(installation.uid).to.be.equal(installationUid)
        expect(installation.params.organization_uid).to.be.equal(orgID)
        expect(installation.urlPath).to.be.equal(`/installations/${installation.installation_uid}`)
        expect(installation.target.type).to.be.equal('organization')
        expect(installation.target.uid).to.be.equal(orgID)
        expect(installation.status).to.be.equal('installed')
        done()
      }).catch(done)
  })
  it('test fetch app request', done => {
    client.marketplace(orgID).app(appUid)
      .getRequests()
      .then((response) => {
        expect(response.data).to.not.equal(undefined)
        done()
      })
      .catch(done)
  })

  it('should reinstall the app', done => {
    client.marketplace(orgID).app(appUid).reinstall({ targetType: 'organization', targetUid: orgID })
      .then((reinstallation) => {
        expect(reinstallation.installation_uid).to.not.equal(undefined)
        expect(reinstallation.status).to.not.equal(undefined)
        done()
      })
      .catch(done)
  })
})
