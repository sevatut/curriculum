import type { Session } from '@/shared/api/session.types'

export type AuthAttempt = { session: Session } | { error: string }
