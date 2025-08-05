import cloneDeep from 'lodash/cloneDeep'
import { App } from './app'
import { Installation } from './installation'
import error from '../core/contentstackError'
import { fetchAll } from '../entity'
import { AppRequest } from './apprequest'

/**
 *
 * @namespace Marketplace
 */
export function Marketplace (http, data) {
  http.defaults.versioningStrategy = undefined
  this.params = {}

  if (data && data.organization_uid) {
    this.params = {
      organization_uid: data.organization_uid
    }

    /**
     * @description App will allow to App instance.
     * @memberof Marketplace
     * @func app
     * @returns {Promise<App>}
     * @returns {App}
     *
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client({ authtoken: 'TOKEN'})
     * await client.login()
     * client.marketplace('organization_uid').app('manifest_uid')
     */
    this.app = (uid = null) => {
      return new App(http, uid !== null ? { data: { uid, organization_uid: data.organization_uid } } : { organization_uid: data.organization_uid })
    }

    /**
     * @description The Installation will allow you to fetch, update and delete of the app installation.
     * @memberof Marketplace
     * @func installation
     * @param {String} uid Installation uid
     * @returns {Installation}
     *
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client({ authtoken: 'TOKEN'})
     * client.organization('organization_uid').app('manifest_uid').installation().findAll()
     * .then((installations) => console.log(installations))
     *
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client({ authtoken: 'TOKEN'})
     * client.marketplace('organization_uid').installation('installation_uid').fetch()
     * .then((installation) => console.log(installation))
     */
    this.installation = (installationUid = null) => {
      return new Installation(http, installationUid ? { data: { installation_uid: installationUid } } : { data: {} }, this.params)
    }

    /**
      * @description The Create request call is used to create a app request for an app.
      * @returns {AppRequest}
      *
      * @example
      * import * as contentstack from '@contentstack/marketplace'
      * const client = contentstack.client({ authtoken: 'TOKEN'})
      *
      * client.marketplace('organization_uid').requests()
      *
      */
    this.appRequests = () => {
      return new AppRequest(http, { organization_uid: data.organization_uid })
    }

    /**
     * @description The findAllApps call is used to fetch all the apps in your Contentstack organization.
     * @memberof Marketplace
     * @func findAllApps
     * @returns {Promise<ContentstackCollection<App>>}
     *
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client({ authtoken: 'TOKEN'})
     *
     * client.marketplace('organization_uid').findAllApps()
     * .then((collection) => console.log(collection))
     *
     */
    this.urlPath = '/manifests'
    this.findAllApps = fetchAll(http, AppCollection, this.params)

    /**
     * @description Search installed apps
     * @memberof Marketplace
     * @func searchInstalledApps
     * @param {String} search - Search term
     * @param {Object} queryParams - Additional query parameters
     * @returns {Promise<ContentstackCollection<App>>}
     *
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client({ authtoken: 'TOKEN'})
     *
     * client.marketplace('organization_uid').searchApps('search_term')
     * .then((collection) => console.log(collection))
     *
     */
    this.searchApps = async (search, queryParams = {}) => {
      try {
        if (!search) {
          throw new Error("Search parameter is required");
        }

        const headers = {
          headers: { ...cloneDeep(this.params) },
          params: {
            search,
            ...cloneDeep(queryParams),
          },
        };
        const response = await http.get(this.urlPath, headers);
        if (response.data) {
          return response.data;
        } else {
          throw error(response);
        }
      } catch (err) {
        throw error(err);
      }
    };
    /**
     * @description To get the apps list of authorized apps for the particular organization
     * @memberof Marketplace
     * @func findAllAuthorizedApps
     * @param {number} skip - Offset for skipping content in the response.
     * @param {number} limit - Limit on api response to provide content in list.
     * @example
     * import * as contentstack from '@contentstack/marketplace'
     * const client = contentstack.client()
     *
     * client.marketplace('organization_uid').findAllAuthorizedApps({ skip: 10 })
     * .then((roles) => console.log(roles))
     *
     */
    this.findAllAuthorizedApps = async (param = {}) => {
      const headers = {
        headers: { ...cloneDeep(this.params) }
      }

      headers.params = { ...param }
      try {
        const response = await http.get(`/authorized-apps`, headers)
        if (response.data) {
          return response.data
        } else {
          return error(response)
        }
      } catch (err) {
        return error(err)
      }
    }
  }
  return this
}

export function AppCollection (http, data) {
  const obj = cloneDeep(data.data) || []
  return obj.map((appData) => {
    return new App(http, { data: appData })
  })
}
