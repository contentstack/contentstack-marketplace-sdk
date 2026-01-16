/**
 * Centralized message handler for all console logs and error messages
 * @namespace MessageHandler
 */

/**
 * Success messages catalog
 */
export const MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'Login successful.',
  
  // Organization - Includes org UID, name, metadata
  ORGANIZATION_LOADED: 'Organization details loaded successfully.',
  
  // API Responses
  API_RESPONSE_SUCCESS: 'API response received successfully.',
  API_RESPONSE_APP_OPERATION: 'API response received for app operation.',
  
  // Marketplace
  MARKETPLACE_API_RESPONSE: 'Marketplace API response received.',
  MARKETPLACE_ROLES_LOADED: 'Marketplace roles loaded successfully.',
  
  // Apps - Includes UID, name, description, config
  APP_LOADED: 'App details loaded successfully.',
  APP_COLLECTION_LOADED: 'App collection loaded successfully.',
  APP_REQUEST_RESPONSE: 'App request response received successfully.',
  
  // Installations - Includes installation UID, app UID, status, config
  INSTALLATION_LOADED: 'App installation details loaded successfully.',
  INSTALLATIONS_LOADED: 'App installation details loaded successfully.',
  INSTALLATION_RESPONSE: 'Installation response received.',
  INSTALLATION_COLLECTION_LOADED: 'Installation collection loaded successfully.',
  INSTALLATION_WEBHOOK_LOADED: 'Installation webhook details loaded successfully.',
  
  // Authorization - Includes redirect URIs, auth codes (no tokens for security)
  AUTHORIZATION_RESPONSE: 'Authorization response received.',
  
  // OAuth - WARNING: May contain sensitive values (client_secret)
  OAUTH_CONFIG_LOADED: 'OAuth configuration loaded successfully.',
  OAUTH_SCOPES_LOADED: 'OAuth scopes loaded successfully.',
  
  // Slack
  SLACK_MESSAGE_SENT: 'Slack message sent successfully.'
}

/**
 * Error messages catalog
 * All errors include: status, statusText, errorMessage, errorCode, errors object, request details
 */
export const ERROR_MESSAGES = {
  // General Request Errors
  REQUEST_FAILED: (title) => `Request failed: ${title}. Review the error details and try again.`,
  HTTP_REQUEST_FAILED: (title) => `HTTP request failed: ${title}. Verify your request and try again.`,
  
  // App Request Errors - Operations: create, update, fetch, delete, install
  APP_REQUEST_PROCESS_FAILED: 'App request process failed. Check the response details and try again.',
  APP_REQUEST_ERROR: 'App request failed. Check the error details and try again.',
  APP_REQUEST_REVIEW: 'App request failed. Review the error details and try again.',
  APP_REQUEST_FAILED: 'Failed to process app request. Check the response details and try again.',
  APP_OPERATION_ERROR: 'App operation error. Review the error details and try again.',
  APP_REQUEST_RESPONSE_RECEIVED: 'App request response received.',
  
  // Authorization Errors - Common causes: invalid client_id, unauthorized redirect_uri, expired codes
  AUTHORIZATION_FAILED: 'Failed to process authorization request. Check the response details and try again.',
  AUTHORIZATION_ERROR: 'Authorization failed. Check the error details and try again.',
  AUTHORIZATION_REVIEW: 'Authorization failed. Review the error details and try again.',
  AUTHORIZATION_RESPONSE_RECEIVED: 'Authorization response received.',
  
  // Deployment Errors - Common causes: build failures, config issues, timeouts
  DEPLOYMENT_FAILED: 'Deployment failed. Check the response details for errors and try again.',
  DEPLOYMENT_ERROR: 'Deployment error occurred. Review the error details and try again.',
  
  // Hosting Errors - Common causes: invalid config, timeouts, deployment failures
  HOSTING_REQUEST_FAILED: 'Hosting request failed. Check the response details and try again.',
  HOSTING_ERROR: 'Hosting error occurred. Review the error details and try again.',
  HOSTING_REQUEST_ERROR: 'Hosting request error. Review the error details and try again.',
  
  // OAuth Errors - Common causes: invalid credentials, expired tokens, scope errors
  OAUTH_REQUEST_FAILED: 'OAuth request failed. Check the response details and try again.',
  OAUTH_ERROR: 'OAuth error occurred. Review the error details and try again.',
  
  // Installation Errors - Operations: fetch, update, uninstall, config
  INSTALLATION_REQUEST_FAILED: 'Installation request failed. Check the response details and try again.',
  INSTALLATION_ERROR: 'Installation error occurred. Review the error details and try again.',
  INSTALLATION_WEBHOOK_FAILED: 'Installation webhook request failed. Check the response details and try again.',
  INSTALLATION_WEBHOOK_ERROR: 'Installation webhook error occurred. Review the error details and try again.',
  
  // Entity Errors - Operations: create, read, update, delete
  ENTITY_REQUEST_FAILED: 'Entity request failed. Check the response details and try again.',
  ENTITY_ERROR: 'Entity error occurred. Review the error details and try again.',
  
  // Marketplace Errors
  MARKETPLACE_REQUEST_FAILED: 'Marketplace request failed. Review the error details and try again.',
  
  // Generic Errors
  GENERIC_ERROR: 'An error occurred. Check the details and try again.'
}

/**
 * Log level constants
 */
export const LOG_LEVELS = {
  ERROR: 'error',
  INFO: 'info',
  WARN: 'warn'
}

/**
 * Log handler for general operations
 * @param {string} level - Log level (error, info, warn)
 * @param {*} data - Data to log
 */
export const logHandler = (level, data) => {
  if (level === LOG_LEVELS.ERROR && data) {
    const title = [data.name, data.message].filter((a) => a).join(' - ')
    console.error(`${ERROR_MESSAGES.REQUEST_FAILED(title)}`)
    return
  }
  console.log(`${level}: ${data}. Check the details for troubleshooting.`)
}

/**
 * Log handler for HTTP client operations
 * @param {string} level - Log level (error, info, warn)
 * @param {*} data - Data to log
 */
export const httpLogHandler = (level, data) => {
  if (level === LOG_LEVELS.ERROR && data) {
    const title = [data.name, data.message].filter((a) => a).join(' - ')
    console.error(`${ERROR_MESSAGES.HTTP_REQUEST_FAILED(title)}`)
    return
  }
  console.log(`${level}: ${data}. Check the HTTP client logs for more information.`)
}

