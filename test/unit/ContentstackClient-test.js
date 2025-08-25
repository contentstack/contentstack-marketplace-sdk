import axios from 'axios'
import ContentstackClient from '../../lib/contentstackClient'
import { expect } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import MockAdapter from 'axios-mock-adapter'
import Region from '../../lib/core/region'
var host = 'localhost'

describe('Region Test ', () => {
  it('Contentstack Client login success with region NA', done => {
    var mock = new MockAdapter(axios)
    axios.defaults.region = Region.NA
    mock.onPost('https://api.contentstack.io:443/v3/user-session').reply(200, {
      user: {
        authtoken: 'Test Auth'
      }
    })

    ContentstackClient({ http: axios })
      .login()
      .then((response) => {
        expect(response.user.authtoken).to.be.equal('Test Auth')
        done()
      })
      .catch(done)
  })
})

describe('Contentstack Client', () => {
  beforeEach(function () {
    host = 'localhost'
    axios.defaults.host = host
    axios.defaults.adapter = 'http'
  })

  it('Contentstack Client Object successful', done => {
    var contentstackClient = ContentstackClient({ http: axios })
    expect(contentstackClient).to.not.equal(null, 'Contentstack client object should not be undefine')
    done()
  })

  it('Contentstack Client login success', done => {
    var mock = new MockAdapter(axios)
    mock.onPost('https://localhost:443/v3/user-session').reply(200, {
      user: {
        authtoken: 'Test Auth'
      }
    })
    ContentstackClient({ http: axios })
      .login()
      .then((response) => {
        expect(response.user.authtoken).to.be.equal('Test Auth')
        done()
      })
      .catch(done)
  })

  it('Contentstack Client Logout with Authtoken', done => {
    var mock = new MockAdapter(axios)
    mock.onDelete('https://localhost:443/v3/user-session').reply(200, {
      notice: 'You\'ve logged out successfully'
    })
    ContentstackClient({ http: axios })
      .logout('Test Auth')
      .then((response) => {
        expect(response.notice).to.be.equal('You\'ve logged out successfully')
        done()
      })
      .catch(done)
  })

  it('Contentstack Client Logout', done => {
    var mock = new MockAdapter(axios)
    mock.onDelete('https://localhost:443/v3/user-session').reply(200, {
      notice: 'You\'ve logged out successfully'
    })
    axios.defaults.headers = {
      common: {
        authtoken: 'Authtoken'
      },
      authtoken: 'Authtoken'

    }
    axios.httpClientParams = {
      headers: {
        authtoken: 'Authtoken'
      },
      authtoken: 'Authtoken'
    }

    ContentstackClient({ http: axios })
      .logout()
      .then((response) => {
        expect(response.notice).to.be.equal('You\'ve logged out successfully')
        done()
      })
      .catch(done)
  })

  it('Contentstack Client Marketplace without app UID test', done => {
    const marketplace = ContentstackClient({ http: axios }).marketplace()

    expect(marketplace.urlPath).to.be.equal(undefined)
    expect(marketplace.app).to.be.equal(undefined)
    expect(marketplace.installation).to.be.equal(undefined)
    expect(marketplace.appRequests).to.be.equal(undefined)
    expect(marketplace.findAllApps).to.be.equal(undefined)
    expect(marketplace.findAllAuthorizedApps).to.be.equal(undefined)
    done()
  })

  it('Contentstack Client Marketplace with app UID test', done => {
    const marketplace = ContentstackClient({ http: axios }).marketplace('app_uid')

    expect(marketplace.urlPath).to.not.equal(undefined)
    expect(marketplace.app).to.not.equal(undefined)
    expect(marketplace.installation).to.not.equal(undefined)
    expect(marketplace.appRequests).to.not.equal(undefined)
    expect(marketplace.findAllApps).to.not.equal(undefined)
    expect(marketplace.findAllAuthorizedApps).to.not.equal(undefined)
    done()
  })

  it('Contentstack Client login success with region AZURE-NA', done => {
    var mock = new MockAdapter(axios)
    axios.defaults.region = Region.AZURE_NA
    mock.onPost('https://azure-na-api.contentstack.com:443/v3/user-session').reply(200, {
      user: {
        authtoken: 'Test Auth'
      }
    })

    ContentstackClient({ http: axios })
      .login()
      .then((response) => {
        expect(response.user.authtoken).to.be.equal('Test Auth')
        done()
      })
      .catch(done)
  })

  it('Contentstack Client login success with region AZURE-EU', done => {
    var mock = new MockAdapter(axios)
    axios.defaults.region = Region.AZURE_EU
    mock.onPost('https://azure-eu-api.contentstack.com:443/v3/user-session').reply(200, {
      user: {
        authtoken: 'Test Auth'
      }
    })

    ContentstackClient({ http: axios })
      .login()
      .then((response) => {
        expect(response.user.authtoken).to.be.equal('Test Auth')
        done()
      })
      .catch(done)
  })

  it('Contentstack Client login success with region GCP-NA', done => {
    var mock = new MockAdapter(axios)
    axios.defaults.region = Region.GCP_NA
    mock.onPost('https://gcp-na-api.contentstack.com:443/v3/user-session').reply(200, {
      user: {
        authtoken: 'Test Auth'
      }
    })

    ContentstackClient({ http: axios })
      .login()
      .then((response) => {
        expect(response.user.authtoken).to.be.equal('Test Auth')
        done()
      })
      .catch(done)
  })
})
