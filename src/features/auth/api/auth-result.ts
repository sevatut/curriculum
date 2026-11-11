import type { Session } from '@/shared/api/session.types'

export type AuthResult = {
  access_token: string
  user: {
    id: string
    email: string
    profile: {
      full_name: string
    } | null
  }
}

export function toSession(result: AuthResult): Session {
  return {
    accessToken: result.access_token,
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.profile?.full_name || result.user.email,
    },
  }
}
