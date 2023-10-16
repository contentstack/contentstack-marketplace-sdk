import * as dotenv from 'dotenv';
import * as Contentstack from '../..';
import { createApp, deleteApp, fetchApp, installation, updateApp, updateAuth } from './app';
import { orgAppRequest } from './app-request';
import { authorization } from './authorization';
import { login, logout } from "./contentstack.user";
import { deployment, hosting } from './hosting';
dotenv.config()
jest.setTimeout(10000);

const client =  Contentstack.client({
    authtoken: process.env.AUTHTOKEN,
    host: process.env.HOST,
})

describe('Typescript API test', () => {
    login(client);

    const mktplace =  client.marketplace(process.env.ORGANIZATION as string)

    createApp(mktplace.app())
    fetchApp(mktplace)
    updateApp(mktplace)
    updateAuth(mktplace)
    installation(mktplace)
    hosting(mktplace.app(process.env.APP_UID as string).hosting())
    deployment(mktplace.app(process.env.APP_UID as string).hosting())
    orgAppRequest(mktplace.app(process.env.APP_UID as string).request())
    authorization(mktplace.app(process.env.APP_UID as string).authorization())
    orgAppRequest(mktplace.request())
    deleteApp(mktplace)

    logout(client)
})