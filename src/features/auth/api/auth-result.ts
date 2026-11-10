import type { Session } from '@/shared/api/session.types'
import { authError, type AuthError } from '@/features/auth/model/auth-error'

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

export const serverErrorKey = {
  EMAIL_TAKEN: authError.emailTaken,
  INVALID_EMAIL: authError.invalidEmail,
  WEAK_PASSWORD: authError.weakPassword,
  USER_NOT_FOUND: authError.userNotFound,
  INVALID_CREDENTIALS: authError.invalidCredentials,
  'Пользователь с таким email не найден': authError.userNotFound,
  'Неверный пароль': authError.invalidCredentials,
} as const satisfies Record<string, AuthError>
