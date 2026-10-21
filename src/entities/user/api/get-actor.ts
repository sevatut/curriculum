import { readSession } from '@/shared/api/session-store'

import type { Actor } from '../model/access'
import { getCurrentUser } from './get-current-user'

export async function getActor(): Promise<Actor | null> {
  const session = await readSession()
  if (!session) return null

  return getCurrentUser(session.user.id)
}
