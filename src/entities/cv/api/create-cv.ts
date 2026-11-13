import { getClient } from '@/shared/api/apollo-client'
import { CREATE_CV } from '@/entities/cv/api/create-cv-mutation'
import type { CreateCvInput } from '@/entities/cv/api/types'

export async function createCv(input: CreateCvInput) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: CREATE_CV,
    variables: {
      cv: {
        userId: input.userId,
        name: input.name,
        education: input.education || null,
        description: input.description || null,
      },
    },
  })

  if (!data?.createCv) {
    throw new Error('GraphQL response does not contain data')
  }
}
