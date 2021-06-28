import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import getConfig from 'next/config'
import withApollo from 'next-with-apollo'

import { routes } from '@browse/common/routes'

const { publicRuntimeConfig } = getConfig()

// TODO Revert publicRuntimeConfig to not be nullable
const GRAPHQL_URL = `${publicRuntimeConfig?.GRAPHQL_HOST_URI}${routes.api.graphQlEndpoint}`

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: true,
      uri: GRAPHQL_URL,
    })
  },
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    },
  }
)
