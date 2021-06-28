import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import getConfig from 'next/config'

import { routes } from '@browse/common/routes'

const { publicRuntimeConfig } = getConfig()

const decodeAuthToken = (token: string): string => {
  return Buffer.from(token, 'base64').toString('ascii')
}

const decodedToken = decodeAuthToken(publicRuntimeConfig.GRAPHQL_AUTHORIZATION)

export default (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  req.headers.authorization = `Bearer ${decodedToken}`

  return httpProxyMiddleware(req, res, {
    target: publicRuntimeConfig.HOST_URI,
    changeOrigin: true,
    pathRewrite: {
      [routes.api.graphQlEndpoint]: publicRuntimeConfig.GRAPHQL_ENDPOINT,
    },
  })
}
