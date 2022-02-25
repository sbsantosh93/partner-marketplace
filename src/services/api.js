/* eslint-disable flowtype/no-types-missing-file-annotation */
 import Cookies from 'js-cookie'

import { split, HttpLink, InMemoryCache, ApolloClient } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
// import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const env = process.env.NODE_ENV
const domain = env === 'development' ? 'localhost' : '.mudey.pt'
const url = env === 'development' ? 'https://dev-api.mudey.pt' : process.env.REACT_APP_API_URL;
const wsURL = env === 'development' ? 'wss://dev-api.mudey.pt/subscriptions' : process.env.REACT_APP_WSS_URL;
const httpLink = new HttpLink({
  uri: url,
  credentials: 'include'
})

const authLink = setContext((_: any, { headers }: any) => {
  const app_token = Cookies.get('MUDEY_token', { domain: domain })
  let token = app_token || 'insta-checkout'
  return {
    headers: {
      ...headers,
      MUDEY_AUTH_TOKEN: token
    }
  }
})

const wsLink = new WebSocketLink({
  uri: wsURL,
  options: {
    //lazy: true,
    // reconnect: true,
    connectionParams: async () => {
      const app_token = await Cookies.get('MUDEY_token', { domain: domain })
      return {
        credentials: 'include',
        MUDEY_AUTH_TOKEN: app_token,
        Authorization: 'Basic bXVkZXlkZXZhcGk6aXRzdGltZQ=='
      }
    }
  }
})

const link = split(
  ({ query }: any) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([link])
})

export default client