import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { Department } from '../model/department'

type GetDepartmentsData = {
  departments: Department[]
}

const GET_DEPARTMENTS: TypedDocumentNode<
  GetDepartmentsData,
  Record<string, never>
> = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`

export async function getDepartments(): Promise<Department[]> {
  const { data } = await query({ query: GET_DEPARTMENTS })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return [...data.departments].sort((left, right) =>
    left.name.localeCompare(right.name),
  )
}
