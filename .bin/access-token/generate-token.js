'use strict'

const auth = require('@adobe/jwt-auth')
const fs = require('fs')
const path = require('path')
const clipboardy = require('clipboardy')

const getServiceToken = () => {
  try {
    const serviceToken = fs.readFileSync(
      path.join(__dirname, '/service_token.json')
    )
    return JSON.parse(serviceToken)
  } catch {
    throw new Error(
      'Unable to locate service token, make sure it is named correctly and in the correct folder location!'
    )
  }
}

async function getAccessToken(developerConsoleCredentials) {
  if (developerConsoleCredentials.accessToken) {
    // This is a Local Development access token
    return developerConsoleCredentials.accessToken
  }
  // This is the Service Credentials JSON object that must be exchanged with Adobe IMS for an access token
  const serviceCredentials = developerConsoleCredentials.integration

  // Use the @adobe/jwt-auth library to pass the service credentials generated a JWT and exchange that with Adobe IMS for an access token.
  // If other programming languages are used, please see these code samples: https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/samples/samples.md
  const { access_token } = await auth({
    clientId: serviceCredentials.technicalAccount.clientId, // Client Id
    technicalAccountId: serviceCredentials.id, // Technical Account Id
    orgId: serviceCredentials.org, // Adobe IMS Org Id
    clientSecret: serviceCredentials.technicalAccount.clientSecret, // Client Secret
    privateKey: serviceCredentials.privateKey, // Private Key to sign the JWT
    metaScopes: serviceCredentials.metascopes.split(','), // Meta Scopes defining level of access the access token should provide
    ims: `https://${serviceCredentials.imsEndpoint}`, // IMS endpoint used to obtain the access token from
  })

  const base64Token = Buffer.from(access_token).toString('base64')
  console.log('Base64 Access Token...', base64Token)
  clipboardy.writeSync(base64Token)

  console.log('\nCopied to your clipboard')
  return base64Token
}

module.exports = getAccessToken(getServiceToken())
