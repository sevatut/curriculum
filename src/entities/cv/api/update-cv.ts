import { getClient } from '@/shared/api/apollo-client'
import { UPDATE_CV } from '@/entities/cv/api/update-cv-mutation'
import type { UpdateCvInput } from '@/entities/cv/api/types'

export async function updateCv(input: UpdateCvInput) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_CV,
    variables: {
      cv: {
        cvId: input.cvId,
        name: input.name,
        education: input.education || null,
        description: input.description || null,
      },
    },
  })

  if (!data?.updateCv) {
    throw new Error('GraphQL response does not contain data')
  }
}
