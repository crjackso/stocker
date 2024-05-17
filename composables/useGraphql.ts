import type { GraphQLClient } from 'graphql-request'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { GraphQLPlugin } from '~/types'

export function useGraphql<T>(
  key: string,
  query: TypedDocumentNode,
  variables: MaybeRef<Record<string, unknown>>,
  asyncDataOptions: { default: () => T | Ref<T> }
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

  return useAsyncData(key, fetch, asyncDataOptions)
}