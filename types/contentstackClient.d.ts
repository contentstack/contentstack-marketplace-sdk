import { AxiosRequestConfig } from 'axios'
import { Response } from './contentstackCollection'
import { Marketplace } from './marketplace'

export interface ProxyConfig {
    host: string
    port: number
    auth?: {
      username: string
      password:string
    };
    protocol?: string
}
export interface RetryDelayOption {
    base?: number
    customBackoff?: (retryCount: number, error: Error) => number
}

export interface ContentstackToken {
    authorization?: string
    authtoken?: string
}

export enum Region {
    EU =  'eu',
    NA = '',
    AZURE_NA = 'azure-na',
    AZURE_EU = 'azure-eu'
}
export interface ContentstackConfig extends AxiosRequestConfig, ContentstackToken {
    proxy?: ProxyConfig | false
    endpoint?: string
    host?: string
    region?: Region
    timeout?: number
    maxRequests?: number
    retryOnError?: boolean
    retryLimit?: number
    retryDelay?: number
    retryCondition?: (error: Error) => boolean
    retryDelayOptions?: RetryDelayOption
    refreshToken?: () => Promise<ContentstackToken>
    maxContentLength?: number
    maxBodyLength?: number
    logHandler?: (level: string, data: any) => void
    application?: string
    integration?: string
}

export interface LoginDetails {
    email: string,
    password: string,
    token?: string
}

export interface ContentstackClient {
    login(user: LoginDetails, params?: any): Promise<any>
    logout(authtoken?: string): Promise<Response>

    marketplace(orgUid: string): Marketplace
}

export function client(config?: ContentstackConfig): ContentstackClient