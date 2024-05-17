import type { GraphQLClient } from 'graphql-request'
import { consola } from 'consola'
import BaseApi from '~/apis/BaseApi'

type GraphQLPlugin = {
  default: GraphQLClient
}

export default defineNuxtPlugin((nuxtApp) => {
  try {
    const endpoint = import.meta.server
      ? 'http://api:3011/graphql'
      : 'http://stocker.localhost/api/graphql'

    const $graphql = nuxtApp.$graphql as GraphQLPlugin
    $graphql.default.setEndpoint(endpoint)

    const base = new BaseApi($graphql.default, consola)

    return {
      provide: {
        api: base
      }
    }
  } catch (e) {
    const error = ensureError(e)
    throw createError({
      message: 'Stocker API plugin registration failed',
      cause: error.cause
    })
  }
})
