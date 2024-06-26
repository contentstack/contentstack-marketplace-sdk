import cloneDeep from 'lodash/cloneDeep'
import error from '../../core/contentstackError'
import { create, deleteEntity, fetch, update } from '../../entity'
import { Authorization } from '../authorization'
import { Hosting } from './hosting'
import { Installation, InstallationCollection } from '../installation'
import { Oauth } from './oauth'
import ContentstackCollection from '../../contentstackCollection'

/**
 *
 * @namespace App
 */
export function App (http, data) {
  http.defaults.versioningStrategy = undefined
  this.urlPath = '/manifests'
  this.params = {}
  if (data) {
    if (data.organization_uid) {
      this.params = {
        organization_uid: data.organization_uid
      }
    }
    if (data.data) {
      Object.assign(this, cloneDeep(data.data))
      if (this.organization_uid) {
        this.params = {
          organization_uid: this.organization_uid
        }
      }
      this.urlPath = `/manifests/${this.uid}`

      /**
         * @description The update manifest call is used to update the app details such as name, description, icon, and so on.
         * @memberof App
         * @func update
         * @returns {Promise<App>}
         *
         * @example
         * import * as contentstack from '@contentstack/marketplace'
         * const client = contentstack.client({ authtoken: 'TOKEN'})
         * const updateApp = {
         *  name: 'APP_NAME',
         *  description: 'APP_DESCRIPTION',
         *  target_type: 'stack'/'organization',
         * }
         * const app = client.marketplace('organization_uid').app('manifest_uid')
         * app = Object.assign(app, updateApp)
         * app.update()
         * .then((app) => console.log(app))
         *
         */
      this.update = update(http, undefined, this.params)

      /**
       * @description  The get manifest call is used to fetch details of a particular app with its ID.
       * @memberof App
       * @func fetch
       * @returns {Promise<App>}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       *
       * client.marketplace('organization_uid').app('manifest_uid').fetch()
       * .then((app) => console.log(app))
       *
       */
      this.fetch = fetch(http, 'data', this.params)

      /**
       * @description The delete manifest call is used to delete the app.
       * @memberof App
       * @func delete
       * @returns {Promise<Response>}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       *
       * client.marketplace('organization_uid').app('manifest_uid').delete()
       * .then((response) => console.log(response))
       */
      this.delete = deleteEntity(http, false, this.params)

      /**
       * @description Oauth will allow to get, update auth and get scopes.
       * @memberof App
       * @func oauth
       * @returns {Oauth}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').oauth()
       */
      this.oauth = () => {
        return new Oauth(http, { app_uid: this.uid, organization_uid: this.organization_uid }, this.params)
      }

      /**
       * @description The hosting will allow you get, update, deploy manifest.
       * @memberof App
       * @func hosting
       * @returns {Hosting}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').hosting()
       */
      this.hosting = () => {
        return new Hosting(http, { app_uid: this.uid }, this.params)
      }

      /**
       * @description The install call is used to initiate the installation of the app
       * @memberof App
       * @func install
       * @param {String} param.targetType - The target on which app needs to be installed, stack or ogranization.
       * @param {String} param.targetUid - The uid of the target, on which the app will be installed
       * @returns Promise<Installation>
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').install({ targetUid: 'STACK_API_KEY', targetType: 'stack' })
       * .then((installation) => console.log(installation))
       */
      this.install = async ({ targetUid, targetType }) => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params) }
          } || {}

          const response = await http.post(`${this.urlPath}/install`, { target_type: targetType, target_uid: targetUid }, headers)
          if (response.data) {
            return new Installation(http, response.data, this.params) || {}
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }

      /**
       * @description The reinstall call is used to initiate the reinstallation of the app
       * @memberof App
       * @func reinstall
       * @param {String} param.targetType - The target on which app needs to be reinstalled, stack or ogranization.
       * @param {String} param.targetUid - The uid of the target, on which the app will be reinstalled
       * @returns Promise<Reinstallation>
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').reinstall({ targetUid: 'STACK_API_KEY', targetType: 'stack' })
       * .then((reinstallation) => console.log(installation))
       */
      this.reinstall = async ({ targetUid, targetType }) => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params) }
          } || {}

          const response = await http.put(`${this.urlPath}/reinstall`, { target_type: targetType, target_uid: targetUid }, headers)
          if (response.data) {
            return new Installation(http, response.data, this.params) || {}
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }

      /**
       * @description The upgrade call is used to upgrade the installation of an app
       * @memberof App
       * @func upgrade
       * @param {String} param.targetType - The target on which app needs to be installed, stack or ogranization.
       * @param {String} param.targetUid - The uid of the target, on which the app will be installed
       * @returns Promise<Installation>
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').install({ targetUid: 'STACK_API_KEY', targetType: 'stack' })
       * .then((installation) => console.log(installation))
       */
      this.upgrade = async ({ targetUid, targetType }) => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params) }
          } || {}

          const response = await http.put(`${this.urlPath}/reinstall`, { target_type: targetType, target_uid: targetUid }, headers)
          if (response.data) {
            return new Installation(http, response.data, this.params) || {}
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }
      /**
        * @description  The GET app requests of an app call is used to retrieve all requests of an app.
        * @returns Promise<Response>
        * @memberof App
        * @func getRequests
        *
        * @example
        * import * as contentstack from '@contentstack/marketplace'
        * const client = contentstack.client({ authtoken: 'TOKEN'})
        *
        * client.marketplace('organization_uid').app('app_uid').getRequests()
        * .then((response) => console.log(response))
        *
         */
      this.getRequests = async () => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params) }
          }

          const response = await http.get(`${this.urlPath}/requests`, headers)
          if (response.data) {
            return response.data
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }
      /**
        * @description  The App authorization allow to authorize app for specific scope.
        * @returns Promise<Response>
        * @param {string} param.responseType Desired grant type
        * @param {string} param.clientId Client id of the app
        * @param {string} param.redirectUri Redirect URL of the app
        * @param {string} param.scope Scopes of the app
        * @param {string} param.state Local state provided by the client
        *
        * @memberof App
        * @func authorize
        *
        * @example
        * import * as contentstack from '@contentstack/marketplace'
        * const client = contentstack.client({ authtoken: 'TOKEN'})
        *
        * client.marketplace('organization_uid').app('app_uid').authorize({ responseType, clientId, redirectUri, scope, state })
        * .then((response) => console.log(response))
        *
         */
      this.authorize = async ({ responseType, clientId, redirectUri, scope, state }) => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params) }
          }
          const content = {
            response_type: responseType,
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scope
          }
          if (state) {
            content.state = state
          }
          const response = await http.post(`${this.urlPath}/authorize`, content, headers)
          if (response.data) {
            return response.data
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }
      /**
       * @description The Authorization will allow you to get all authorization, revoke specific or all authorization
       * @memberof App
       * @func authorization
       * @returns {Authorization}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * client.marketplace('organization_uid').app('manifest_uid').authorization()
       */
      this.authorization = () => {
        return new Authorization(http, { app_uid: this.uid }, this.params)
      }

      /**
       * @description The list installation call is used to retrieve all installations of your Contentstack organization.
       * @memberof App
       * @func listInstallations
       * @returns {Promise<ContentstackCollection<Installation>>}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       *
       * client.marketplace('organization_uid').app('app_uid').listInstallations()
       * .then((collection) => console.log(collection))
       *
       */
      this.listInstallations = async () => {
        try {
          const headers = {
            headers: { ...cloneDeep(this.params), ...cloneDeep(this.headers) }
          }
          const response = await http.get(`manifests/${this.uid}/installations`, headers)
          if (response.data) {
            return new ContentstackCollection(response, http, this.stackHeaders, InstallationCollection)
          } else {
            throw error(response)
          }
        } catch (err) {
          throw error(err)
        }
      }
    } else {
      /**
       * @description The create manifest call is used for creating a new app/manifest in your Contentstack organization.
       * @memberof App
       * @func create
       * @returns {Promise<App>}
       *
       * @example
       * import * as contentstack from '@contentstack/marketplace'
       * const client = contentstack.client({ authtoken: 'TOKEN'})
       * const app = {
       *  name: 'APP_NAME',
       *  description: 'APP_DESCRIPTION',
       *  target_type: 'stack'/'organization',
       *  webhook: // optional
       *   {
       *     target_url: 'TARGET_URL',
       *     channel: 'CHANNEL'
       *   },
       *  oauth: // optional
       *   {
       *     redirect_uri: 'REDIRECT_URI',
       *     enabled: true,
       *   }
       * }
       *
       * client.marketplace('organization_uid').app().create(app)
       * .then((app) => console.log(app))
       *
       */
      this.create = create({ http, params: this.params })
    }
  }
  return this
}
