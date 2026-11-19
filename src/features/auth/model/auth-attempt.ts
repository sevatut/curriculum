import type { Session } from '@/shared/api/session.types'
import type { AuthError } from '@/features/auth/model/auth-error'

export type AuthAttempt = { session: Session } | { error: AuthError }
