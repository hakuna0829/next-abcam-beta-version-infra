This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Importing Entity Model & Content to AEM

In order to import the Entity model and some sample data, you will need to upload & install the [Abcam PoC Package](/model-and-content/Abcam-SSR-POC.zip) to the [AEM Package Manager](http://localhost:4502/crx/packmgr/index.jsp).

## GraphQL Authorization

1. Generate a service token - see this guide: https://experienceleague.adobe.com/docs/experience-manager-learn/getting-started-with-aem-headless/authentication/service-credentials.html?lang=en

- The token will look like this:
  {
  "ok": true,
  "integration": {
  "imsEndpoint": "ims-na1.adobelogin.com",
  "metascopes": "ent_aem_cloud_api",
  "technicalAccount": {
  "clientId": "12345",
  "clientSecret": "12345"
  },
  "email": "12345@adobe.com",
  "id": "E38D6E50604B2E760A495E9C@techacct.adobe.com",
  "org": "CF113A055DD568E50A495FDF@AdobeOrg",
  "privateKey": "-----BEGIN RSA PRIVATE KEY----- \***\* -----END RSA PRIVATE KEY-----\r\n",
  "publicKey": "-----BEGIN CERTIFICATE-----\r\n\*\***\r\n-----END CERTIFICATE-----\r\n"
  },
  "statusCode": 200
  }

2. Once you have generated and downloaded the service token, rename it to `service_token.json`, and copy it into `.bin/access-token`
3. ## Generate the JWT by running `yarn generate-aem-auth-token` in your terminal. The output will be:

   Access Token... ey\*\*\*==

   ## Copied to your clipboard

4. The token is now base64 encoded in the clipboard. Paste the value in the env variable `GRAPHQL_AUTHORIZATION` in `.local.env`

   GRAPHQL_AUTHORIZATION=YOUR-TOKEN

5. (Re)Start your server.
