import type { GraphQLPlugin } from "~/types"

export default defineNuxtPlugin({
  name: 'graphqlClient',
  dependsOn: ['baseUrl'],
  setup(nuxtApp) {
    const endpoint = `${nuxtApp.$baseURL}/graphql`
    const $graphql = nuxtApp.$graphql as GraphQLPlugin
    $graphql.default.setEndpoint(endpoint)

    return {
      provide: {
        graphqlClient: $graphql.default
      }
    }
  }
})
