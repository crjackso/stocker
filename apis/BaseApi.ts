import { type DocumentNode } from 'graphql'
import type { GraphQLClient } from 'graphql-request'
import type { ConsolaInstance } from 'consola'

class BaseApi {
  constructor(
    private readonly $graphql: GraphQLClient,
    private logger: ConsolaInstance
  ) {}

  async query<T>(
    queryBody: DocumentNode,
    variables: Record<string, unknown>
  ): Promise<T> {
    const field = parseQueryName(queryBody)

    this.logger.info(
      `Making GraphQL request ${field} ${JSON.stringify(variables)}`
    )

    const response = await this.$graphql.request<T>(queryBody, variables)
    return response[field as keyof T] as T
  }
}

export default BaseApi
