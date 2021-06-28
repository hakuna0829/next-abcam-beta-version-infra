import getConfig from 'next/config'

import { ApolloClient, InMemoryCache } from '@apollo/client'

import { routes } from '@browse/common/routes'

const { publicRuntimeConfig } = getConfig()

// TODO Revert publicRuntimeConfig to not be nullable
const GRAPHQL_URL = `${publicRuntimeConfig?.GRAPHQL_HOST_URI}${routes.api.graphQlEndpoint}`

const graphQlClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export { graphQlClient }
