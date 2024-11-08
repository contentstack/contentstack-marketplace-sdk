[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

## Contentstack Marketplace SDK

Contentstack is a headless CMS with an API-first approach. It is a CMS that developers can use to build powerful cross-platform applications in their favorite languages. All you have to do is build your application frontend, and Contentstack will take care of the rest. [Read More](https://www.contentstack.com/).

The new Contentstack Marketplace serves as a one-stop shop for all of your integration requirements. It's where you'll find pre-built apps, starters, tutorials, and everything you'll need to create a fully customized digital experience stack. This SDK helps in managing marketplace related operations.
### Prerequisite

You need Node.js version 10 or above installed on your machine to use the Contentstack Marketplace SDK.

### Installation
#### Node
Install it via npm:
```bash
npm i @contentstack/marketplace-sdk
```
To import the SDK, use the following command:
```
import contentstack from ‘@contentstack/marketplace-sdk’

contentstackClient = contentstack.client()
```

### Authentication
To use this SDK, you need to authenticate your users by using the Authtoken, credentials, or Management Token (stack-level token).
### Authtoken
An [Authtoken](https://www.contentstack.com/docs/developers/create-tokens/types-of-tokens/#authentication-tokens-authtokens-) is a read-write token used to make authorized CMA requests, and it is a **user-specific** token.
```
contentstackClient = contentstack.client({ authtoken: 'AUTHTOKEN' })
```
### Login
To Login to Contentstack by using credentials, you can use the following lines of code:
```
contentstackClient.login({ email: 'EMAIL', password: 'PASSWORD'})
```

### OAuth Token
[Contentstack OAuth](https://www.contentstack.com/docs/developers/developer-hub/contentstack-oauth) uses the OAuth 2.0 protocol that allows external applications and services to access Contentstack APIs on behalf of a user.
```
contentstackClient = contentstack.client({ authorization: 'OAUTH_TOKEN' })
```
### Contentstack Marketplace SDK: 5-minute Quickstart
#### Initializing Your SDK:
To use the Marketplace SDK, you need to first initialize it. To do this, use the following code:
```
import contentstack from ‘@contentstack/marketplace-sdk’

const contentstackClient = contentstack.client({ authtoken: 'AUTHTOKEN' })
```
#### Find All Marketplace Apps
To retrieve the details of all the apps in your Contentstack organization, execute the following code:
```
import * as contentstack from '@contentstack/marketplace-sdk'

const client = contentstack.client({ authtoken: 'TOKEN'})

client.marketplace('organization_uid')
	.findAllApps()
	.then((collection) => {
		console.log(collection)
	})
```
#### Fetch single app details
To retrieve the details of a particular app, execute the following code:
```
import * as contentstack from '@contentstack/marketplace-sdk'
const client = contentstack.client({ authtoken: 'TOKEN'})

client.marketplace('organization_uid')
	.app('manifest_uid')
	.fetch()
	.then((app) => console.log(app))
```
#### Create a new app
To create a new app/manifest in your Contentstack organization, execute the following code:
```
import * as contentstack from '@contentstack/marketplace-sdk'
const client = contentstack.client({ authtoken: 'TOKEN'})
const app = {
 name: 'APP_NAME',
 description: 'APP_DESCRIPTION',
 target_type: 'stack'/'organization',
 webhook: // optional
  {
    target_url: 'TARGET_URL',
    channel: 'CHANNEL'
  },
 oauth: // optional
  {
    redirect_uri: 'REDIRECT_URI',
    enabled: true,
  }
}

client.marketplace('organization_uid')
	.app()
	.create(app)
	.then((app) => console.log(app))
```

### Helpful Links

-   [Contentstack Website](https://www.contentstack.com/)
-   [Official Documentation](https://contentstack.com/docs)
-   [About Contentstack Marketplace](https://www.contentstack.com/docs/developers/marketplace-platform-guides/about-marketplace)

### The MIT License (MIT)
Copyright © 2012-2024  [Contentstack](https://www.contentstack.com/). All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
