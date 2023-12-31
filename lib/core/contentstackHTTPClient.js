import axios from 'axios'
import clonedeep from 'lodash/cloneDeep'
import Qs from 'qs'
import { ConcurrencyQueue } from './concurrency-queue'
import { isHost } from './Util'
import Region from './region'

export default function contentstackHttpClient (options) {
  const defaultConfig = {
    insecure: false,
    retryOnError: true,
    logHandler: (level, data) => {
      if (level === 'error' && data) {
        const title = [data.name, data.message].filter((a) => a).join(' - ')
        console.error(`[error] ${title}`)
        return
      }
      console.log(`[${level}] ${data}`)
    },
    retryCondition: (error) => {
      if (error.response && error.response.status === 429) {
        return true
      }
      return false
    },
    headers: {},
    basePath: '',
    proxy: false,
    httpAgent: false,
    httpsAgent: false,
    adapter: false,
    timeout: 30000
  }

  const config = {
    ...defaultConfig,
    ...clonedeep(options)
  }

  if (config.apiKey) {
    config.headers['apiKey'] = config.apiKey
  }

  if (config.accessToken) {
    config.headers['accessToken'] = config.accessToken
  }

  const protocol = config.insecure ? 'http' : 'https'
  let hostname = config.defaultHostName
  let port = config.port || 443
  let baseUrlPath = ''

  if (isHost(config.host)) {
    const parsed = config.host.split(':')
    if (parsed.length === 2) {
      [hostname, port] = parsed
    } else {
      hostname = parsed[0]
    }
  }
  if (config.basePath) {
    config.basePath = `/${config.basePath.split('/').filter(Boolean).join('/')}`
  }
  if (config.region && config.region !== Region.NA) {
    baseUrlPath = `${protocol}://${config.region}-${hostname}:${port}${config.basePath}`
  } else {
    baseUrlPath = `${protocol}://${hostname}:${port}${config.basePath}`
  }
  const baseURL = config.endpoint || baseUrlPath
  const axiosOptions = {
    // Axios
    baseURL,
    ...config,
    paramsSerializer: function (params) {
      var query = params.query
      delete params.query
      var qs = Qs.stringify(params, { arrayFormat: 'brackets' })
      if (query) {
        qs = qs + `&query=${encodeURIComponent(JSON.stringify(query))}`
      }
      params.query = query
      return qs
    },
    versioningStrategy: 'path'
  }
  const instance = axios.create(axiosOptions)
  instance.httpClientParams = options
  instance.concurrencyQueue = new ConcurrencyQueue({ axios: instance, config })
  return instance
}
