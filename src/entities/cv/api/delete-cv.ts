import { getClient } from '@/shared/api/apollo-client'
import { DELETE_CV } from '@/entities/cv/api/delete-cv-mutation'

export async function deleteCv(cvId: string) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: DELETE_CV,
    variables: { cv: { cvId } },
  })

  if (!data?.deleteCv?.affected) {
    throw new Error('CV was not deleted')
  }
}
