import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'

type UpdateProfileData = {
  updateProfile: {
    full_name: string
  } | null
}

type UpdateProfileVariables = {
  profile: {
    userId: string
    first_name: string
    last_name: string
  }
}

const UPDATE_PROFILE: TypedDocumentNode<UpdateProfileData, UpdateProfileVariables> =
  gql`
    mutation UpdateProfile($profile: UpdateProfileInput!) {
      updateProfile(profile: $profile) {
        full_name
      }
    }
  `

export async function updateProfile(input: {
  userId: string
  firstName: string
  lastName: string
}): Promise<string> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_PROFILE,
    variables: {
      profile: {
        userId: input.userId,
        first_name: input.firstName,
        last_name: input.lastName,
      },
    },
  })

  const fullName = data?.updateProfile?.full_name?.trim()
  if (!fullName) {
    throw new Error('GraphQL response does not contain data')
  }

  return fullName
}
