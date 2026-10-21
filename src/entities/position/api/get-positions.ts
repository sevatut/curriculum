import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { Position } from '../model/position'

type GetPositionsData = {
  positions: Position[]
}

const GET_POSITIONS: TypedDocumentNode<GetPositionsData, Record<string, never>> = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`

export async function getPositions(): Promise<Position[]> {
  const { data } = await query({ query: GET_POSITIONS })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return [...data.positions].sort((left, right) => left.name.localeCompare(right.name))
}
