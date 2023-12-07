import * as contentstack from '../../lib/contentstack.js'
import dotenv from 'dotenv'
dotenv.config()
function contentstackClient (authtoken = null) {
  var params = { host: process.env.HOST, defaultHostName: process.env.DEFAULTHOST, region: 'azure-ea' }
  if (authtoken) {
    params.authtoken = authtoken
  }
  return contentstack.client(params)
}

export { contentstackClient }
