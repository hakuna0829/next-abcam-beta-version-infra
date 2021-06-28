import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-api-key': 'da2-lnmvzuo2vbdthe57n56xquwfla',
    },
  }
})

const httpLink = createHttpLink({
  uri:
    'https://g4ebzq2sh5b5hdpgn7j7fqsuty.appsync-api.eu-west-1.amazonaws.com/graphql',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export { client }
