import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs'

function getGraphqlUrl() {
  return process.env.GRAPHQL_URL ?? ''
}

export const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: getGraphqlUrl(),
      fetchOptions: { cache: 'no-store' },
    }),
  })
})
