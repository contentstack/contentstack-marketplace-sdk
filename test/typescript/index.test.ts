import * as dotenv from 'dotenv';
import * as Contentstack from '../..';
import { createApp, deleteApp, fetchApp, installation, updateApp, updateAuth } from './app';
import { orgAppRequest } from './app-request';
import { authorization } from './authorization';
import { login, logout, loginWithRegion } from "./contentstack.user";
import { deployment, hosting } from './hosting';
dotenv.config()
jest.setTimeout(10000);

const client =  Contentstack.client({
    authtoken: process.env.AUTHTOKEN,
    host: process.env.HOST,
})
const clientWithRegion =  Contentstack.client({
    authtoken: process.env.AUTHTOKEN,
    host: process.env.HOST,
    region: Contentstack.Region.AZURE_NA
})

describe('Typescript API test', () => {
    login(client);
    loginWithRegion(clientWithRegion);

    const mktplace =  client.marketplace(process.env.ORGANIZATION as string)

    createApp(mktplace.app())
    fetchApp(mktplace)
    updateApp(mktplace)
    installation(mktplace)
    hosting(mktplace.app(process.env.APP_UID as string).hosting())
    deployment(mktplace.app(process.env.APP_UID as string).hosting())
    orgAppRequest(mktplace.appRequests())
    authorization(mktplace)
    deleteApp(mktplace)

    logout(client)
})