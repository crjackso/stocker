import type { AsyncDataOptions } from 'nuxt/app'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { GraphQLClient } from 'graphql-request'
import type { GraphQLPlugin } from '~/types'

type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>

export interface GraphqlQueryOptions<T, TDefaultType = T> extends AsyncDataOptions<T, T, KeysOf<T>, TDefaultType> { }

export async function useGraphql<T>(
  key: string,
  query: TypedDocumentNode,
  variables: MaybeRef<Record<string, unknown>>,
  asyncDataOptions: GraphqlQueryOptions<T>
) {
  const variableRef = toRef(variables)
  const { $graphql, $log } = useNuxtApp()
  const client: GraphQLClient = ($graphql as GraphQLPlugin).default
  const field = parseQueryName(query)

  const fetch = async () => {
    $log.info(`Making GraphQL request ${field} ${JSON.stringify(variableRef.value)}`)
    const response = await client.request<T>(query, variableRef.value)
    return response[field as keyof T] as T
  }

  return await useAsyncData(key, fetch, asyncDataOptions)
}
