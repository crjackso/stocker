import type { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql'

/**
 * Extract the name of the selection from the graphql query
 * @param {gql} query - The query object returned from the gql tag
 * @return {string} The name of the field selected.
 * @throws {Error}
 */
export const parseQueryName = (query: DocumentNode): string | undefined => {
  const documentNode = parseOperation(query)

  return parseSelection(documentNode).name.value
}

const parseSelection = (
  documentNode: OperationDefinitionNode | undefined
): FieldNode => {
  const selections = documentNode?.selectionSet.selections

  if (selections?.length === 1) {
    return selections[0] as FieldNode
  } else {
    throw new Error('Unable to parse selection from query')
  }
}

// const parseSelection = (query: DocumentNode) => {
//   // const selections = parseOperation(query)?.selectionSet?.selections
//   const

//   if (selections?.length === 1) {
//     return selections[0]
//   } else {
//     throw new Error(`Unable to parse selection from ${queryErrorString(query)}`)
//   }
// }

const parseOperation = (
  query: DocumentNode
): OperationDefinitionNode | undefined => {
  const operation = query.definitions?.find(
    (d) => d.kind === 'OperationDefinition'
  ) as OperationDefinitionNode

  if (operation) {
    return operation
  } else {
    throw new Error(`Unable to parse operation from ${queryErrorString(query)}`)
  }
}

const queryErrorString = (query: DocumentNode) => {
  return query.loc?.source.body
}
