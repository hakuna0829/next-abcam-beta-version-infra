import graphql from './graphql'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

jest.mock('next-http-proxy-middleware')

describe('graphql', () => {
  it('adds decoded token as auth header', async () => {
    const req = {
      headers: {},
    }

    await graphql(req as NextApiRequest, {} as NextApiResponse)

    expect(httpProxyMiddleware as jest.Mock).toBeCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({ authorization: 'Bearer :G+%+,' }),
      }),
      expect.anything(),
      expect.anything()
    )
  })

  it('adds a url rewrite for the graphql endpoint', async () => {
    const req = {
      headers: {},
    }

    await graphql(req as NextApiRequest, {} as NextApiResponse)

    expect(httpProxyMiddleware as jest.Mock).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        pathRewrite: expect.objectContaining({
          '/api/graphql': '/content/graphql/endpoint.gql',
        }),
      })
    )
  })
})
