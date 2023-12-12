import error from './core/contentstackError'
import cloneDeep from 'lodash/cloneDeep'
import ContentstackCollection from './contentstackCollection'

export const create = ({ http, params }) => {
  return async function (data, param) {
    const headers = {
      headers: {
        ...cloneDeep(params),
        ...cloneDeep(this.stackHeaders)
      },
      params: {
        ...cloneDeep(param)
      }
    } || {}

    try {
      const response = await http.post(this.urlPath, data, headers)
      if (response.data) {
        return new this.constructor(http, parseData(response, this.stackHeaders, this.content_type_uid))
      } else {
        throw error(response)
      }
    } catch (err) {
      throw error(err)
    }
  }
}

export const update = (http, type, params = {}) => {
  return async function (param = {}) {
    let updateData = {}
    const json = cloneDeep(this)
    delete json.stackHeaders
    delete json.urlPath
    delete json.uid
    delete json.org_uid
    delete json.api_key
    delete json.created_at
    delete json.created_by
    delete json.deleted_at
    delete json.updated_at
    delete json.updated_by
    delete json.updated_at
    if (type) {
      updateData[type] = json
    } else {
      updateData = json
    }
    try {
      const response = await http.put(this.urlPath, updateData, { headers: {
        ...cloneDeep(this.stackHeaders),
        ...cloneDeep(params)
      },
      params: {
        ...cloneDeep(param)
      }
      })
      if (response.data) {
        return new this.constructor(http, parseData(response, this.stackHeaders, this.content_type_uid))
      } else {
        throw error(response)
      }
    } catch (err) {
      throw error(err)
    }
  }
}

export const deleteEntity = (http, force = false, params = {}) => {
  return async function (param = {}) {
    try {
      const headers = {
        headers: { ...cloneDeep(this.stackHeaders), ...cloneDeep(params) },
        params: { ...cloneDeep(param) }
      } || {}
      if (force === true) {
        headers.params.force = true
      }
      const response = await http.delete(this.urlPath, headers)
      if (response.data) {
        return response.data
      } else {
        if (response.status >= 200 && response.status < 300) {
          return {
            status: response.status,
            statusText: response.statusText
          }
        } else {
          throw error(response)
        }
      }
    } catch (err) {
      throw error(err)
    }
  }
}

export const fetch = (http, type, params = {}) => {
  return async function (param = {}) {
    try {
      const headers = {
        headers: { ...cloneDeep(this.stackHeaders), ...cloneDeep(params) },
        params: {
          ...cloneDeep(param)
        }
      } || {}
      if (this.organization_uid) {
        headers.headers.organization_uid = this.organization_uid
      }

      const response = await http.get(this.urlPath, headers)
      if (response.data) {
        if (type === 'entry') {
          response.data[type]['content_type'] = response.data['content_type']
          response.data[type]['schema'] = response.data['schema']
        }
        return new this.constructor(http, parseData(response, this.stackHeaders, this.content_type_uid))
      } else {
        throw error(response)
      }
    } catch (err) {
      throw error(err)
    }
  }
}
export const fetchAll = (http, wrapperCollection, params = {}) => {
  return async function (param = {}) {
    const headers = {
      headers: { ...cloneDeep(this.stackHeaders), ...cloneDeep(params) },
      params: {
        ...cloneDeep(param)
      }
    } || {}

    try {
      const response = await http.get(this.urlPath, headers)
      if (response.data) {
        return new ContentstackCollection(response, http, this.stackHeaders, wrapperCollection)
      } else {
        throw error(response)
      }
    } catch (err) {
      throw error(err)
    }
  }
}

export function parseData (response, stackHeaders, contentTypeUID) {
  const data = response.data || {}
  if (stackHeaders) {
    data.stackHeaders = stackHeaders
  }
  if (contentTypeUID) {
    data.content_type_uid = contentTypeUID
  }
  return data
}
