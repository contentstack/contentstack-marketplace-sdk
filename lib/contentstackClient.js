/**
 * @namespace ContentstackClient
 */

import error from './core/contentstackError'
import { Marketplace } from './marketplace/index.js'
import { Region } from './contentstack.js'

export default function contentstackClient ({ http }) {
  /**
   * @description The login call is used to sign in to your Contentstack account and obtain the authtoken.
   * @memberof ContentstackClient
   * @func login
   * @param {Object} parameters - login parameters
   * @prop {string} parameters.email - email id for user to login
   * @prop {string} parameters.password - password for user to login
   * @prop {string} parameters.token - token for user to login
   * @returns {Promise}
   * @example
   * import * as contentstack from '@contentstack/management'
   * const client = contentstack.client()
   *
   * client.login({ email: <emailid>, password: <password> })
   * .then(() => console.log('Logged in successfully'))
   *
   * client.marketplace()
   */

  const region = http.defaults.region
  let baseUrlPath = `/user-session`

  if (region && region !== Region.NA) {
    baseUrlPath = `https://${region}-api.contentstack.com:443/v3/user-session`
  } else if (!region && http?.defaults?.host) {
    baseUrlPath = `https://${http.defaults.host}:443/v3/user-session`
  } else {
    baseUrlPath = `https://api.contentstack.io:443/v3/user-session`
  }

  function login (requestBody, params = {}) {
    http.defaults.versioningStrategy = 'path'
    return http.post(baseUrlPath, { user: requestBody }, { params: params })
      .then((response) => {
        if (response.data.user != null && response.data.user.authtoken != null) {
          http.defaults.headers.common.authtoken = response.data.user.authtoken
        }
        return response.data
      }, error)
  }

  /**
   * @description Organization is the top-level entity in the hierarchy of Contentstack, consisting of stacks and stack resources, and users.
   * @memberof ContentstackClient
   * @func organization
   * @param {String} uid - Organization UID.
   * @returns {Organization} Instance of Organization.
   *
   * @example
   * import * as contentstack from '@contentstack/management'
   * const client = contentstack.client()
   *
   * client.organization().findAll()
   * .then((organization) => console.log(organization))
   *
   * @example
   * import * as contentstack from '@contentstack/management'
   * const client = contentstack.client()
   *
   * client.marketplace('org_uid')
   *
   */
  function marketplace (orgUid) {
    http.defaults.versioningStrategy = 'path'
    return new Marketplace(http, { organization_uid: orgUid })
  }

  /**
   * @description The Log out of your account call is used to sign out the user of Contentstack account.
   * @memberof ContentstackClient
    * @param {String} authtoken - Authtoken to logout from.
   * @func logout
   * @returns {Object} Response object.
   *
   * @example
   * import * as contentstack from '@contentstack/management'
   * const client = contentstack.client()
   * client.logout()
   * .then((response) => console.log(response))
   *
   * @example
   * import * as contentstack from '@contentstack/management'
   * const client = contentstack.client()
   * client.logout('AUTHTOKEN')
   * .then((response) => console.log(response))
   *   */
  function logout (authtoken) {
    http.defaults.versioningStrategy = 'path'
    if (authtoken !== undefined) {
      return http.delete(baseUrlPath, {
        headers: {
          authtoken: authtoken
        }
      })
        .then((response) => {
          return response.data
        }, error)
    }
    return http.delete(baseUrlPath)
      .then((response) => {
        if (http.defaults.headers.common) {
          delete http.defaults.headers.common.authtoken
        }
        delete http.defaults.headers.authtoken
        delete http.httpClientParams.authtoken
        delete http.httpClientParams.headers.authtoken
        return response.data
      }, error)
  }

  return {
    login: login,
    logout: logout,
    marketplace: marketplace,
    axiosInstance: http
  }
}
