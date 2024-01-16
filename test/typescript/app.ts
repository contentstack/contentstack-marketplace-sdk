import { expect } from 'chai';
import * as dotenv from 'dotenv'
import { AppData, AppOAuth, Apps } from '../../types/marketplace/app'
import { Marketplace } from '../../types/marketplace';
dotenv.config()
let appUid = ''
let installationUid = ''

const app: AppData  = {
    name: 'My New App',
    description: 'My new test app',
    target_type: 'stack',
  }
const config: AppOAuth = { redirect_uri: 'https://example.com/oauth/callback', app_token_config: { enabled: true, scopes: ['scim:manage'] }, user_token_config: { enabled: true, scopes: ['user:read', 'user:write', 'scim:manage'], allow_pkce: true } }
  
export function createApp(apps: Apps) {
    describe('App create', () => { 
        test('should Create App', done => {
            apps.create(app)
            .then((appResponse) => {
                appUid = appResponse.uid
                // process.env.APP_UID =  appResponse.uid
                expect(appResponse.uid).to.not.equal(undefined)
                expect(appResponse.name).to.be.equal(app.name)
                expect(appResponse.description).to.be.equal(app.description)
                expect(appResponse.target_type).to.be.equal(app.target_type)
                done()
            })
            .catch(done)
        })
    })
}

export function fetchApp(marketplace: Marketplace) {
    describe('App fetch', () => { 
        test('should Fetch App', done => {
            marketplace.app(appUid).fetch()
            .then((appResponse) => {
                expect(appResponse.uid).to.not.equal(undefined)
                expect(appResponse.name).to.be.equal(app.name)
                expect(appResponse.description).to.be.equal(app.description)
                expect(appResponse.target_type).to.be.equal(app.target_type)
                done()
            }).catch(done)
        })

        test('should Find all Apps', done => {
            marketplace.findAllApps()
            .then((apps) => {
                for (const index in apps.items) {
                    const appObject = apps.items[index]
                    expect(appObject.name).to.not.equal(null)
                    expect(appObject.uid).to.not.equal(null)
                    expect(appObject.target_type).to.not.equal(null)
                }
                done()
            }).catch(done)
        })
        test('should Find all Authorized Apps', done => {
            marketplace.findAllAuthorizedApps()
            .then((apps) => {
                for (const index in apps.data) {
                    const appObject = apps.data[index]
                    expect(appObject.name).to.not.equal(null)
                    expect(appObject.uid).to.not.equal(null)
                    expect(appObject.target_type).to.not.equal(null)
                  }
                done()
            }).catch(done)
        })
    })
}

export function updateApp(marketplace: Marketplace) {
    describe('App update', () => {
        test('should Update App', done => {
            const appObj = marketplace.app(appUid)
            Object.assign(appObj, { name: 'My Updated App' })
            appObj.update()
            .then((appResponse) => {
                expect(appResponse.name).to.be.equal('My Updated App')
                expect(appResponse.description).to.be.equal(app.description)
                expect(appResponse.target_type).to.be.equal(app.target_type)
                done()
            })
            .catch(done)
        })
    })
}

// update Auth not present even on JS
export function updateAuth(marketplace: Marketplace) {
    describe('App update auth', () => {
        test('should Update App auth', done => {
            marketplace.app(appUid).updateOAuth({config})
            .then((appResponse) => {
                expect(appResponse.redirect_uri).to.be.equal(config.redirect_uri)
                expect(appResponse.app_token_config!).to.deep.equal(config.app_token_config)
                expect(appResponse.user_token_config!).to.deep.equal(config.user_token_config)
                done()
            }).catch(done)
        })
    })
    describe('App update auth', () => {
        test('should fetch App auth', done => {
            marketplace.app(appUid).fetchOAuth()
            .then((appResponse) => {
                expect(appResponse.redirect_uri).to.be.equal(config.redirect_uri)
                expect(appResponse.app_token_config!).to.deep.equal(config.app_token_config)
                expect(appResponse.user_token_config!).to.deep.equal(config.user_token_config)
                done()
            }).catch(done)
        })
    })
}

export function installation(marketplace: Marketplace) {
    describe('App installation', () => {
        test('should Install App', done => {
            marketplace.app(appUid).install({targetType: 'stack', targetUid: process.env.APIKEY as string})
            .then((installation) => {
                installationUid = installation.installation_uid
                expect(installation.installation_uid).to.not.equal(undefined)
                expect(installation.urlPath).to.be.equal(`/installations/${installation.installation_uid}`)
                expect(installation.fetch).to.not.equal(undefined)
                expect(installation.update).to.not.equal(undefined)
                expect(installation.uninstall).to.not.equal(undefined)
                done()
            }).catch(done)
        })

        test('should Get all installations', done => {
            marketplace.installation().fetchAll()
            .then((installations) => {
                for (const index in installations.items) {
                    const installationObject = installations.items[index]
                    expect(installationObject.uid).to.not.equal(null)
                    expect(installationObject.params.organization_uid).to.not.equal(null)
                    expect(installationObject.urlPath).to.not.equal(null)
                    expect(installationObject.fetch).to.not.equal(null)
                    expect(installationObject.update).to.not.equal(null)
                    expect(installationObject.uninstall).to.not.equal(null)
                  }
                done()
            }).catch(done)
        })

        test('should Fetch App installation', done => {
            marketplace.installation(installationUid).fetch()
            .then((installation) => {
                expect(installation.uid).to.be.equal(installationUid)
                expect(installation.params.organization_uid).to.be.equal(process.env.ORGANIZATION as string)
                expect(installation.urlPath).to.be.equal(`/installations/${installation.uid}`)
                expect(installation.target.type).to.be.equal('stack')
                expect(installation.target.uid).to.be.equal(process.env.APIKEY)
                expect(installation.status).to.be.equal('installed')
                done()
            }).catch(done)
        })

        test('should Get installation data for App installation', done => {
            marketplace.installation(installationUid).installationData()
            .then(() => {
                done()
            }).catch(done)
        })

        test('should Get Configuration for App installation', done => {
            marketplace.installation(installationUid).configuration()
            .then(() => {
                done()
            }).catch(done)
        })

        test('should Get Server Configuration for App installation', done => {
            marketplace.installation(installationUid).serverConfig()
            .then(() => {
                done()
            }).catch(done)
        })

        test('should Set Configuration for App installation', done => {
            marketplace.installation(installationUid).setConfiguration({})
            .then(() => {
                done()
            }).catch(done)
        })

        test('should Set Server Configuration for App installation', done => {
            marketplace.installation(installationUid).setServerConfig({})
            .then(() => {
                done()
            }).catch(done)
        })

        test('should Uninstall App installation', done => {
            marketplace.installation(installationUid).uninstall()
            .then((installation) => {
                expect(installation).to.deep.equal({})
                done()
            }).catch(done)
        })
    })
}

export function deleteApp(marketplace: Marketplace) {
    describe('App delete', () => {
        test('should Delete App', done => {
            marketplace.app(appUid).delete()
            .then((appResponse) => {
                expect(appResponse).to.deep.equal({})
                done()
            }).catch(done)
        })
    })
}

export default appUid