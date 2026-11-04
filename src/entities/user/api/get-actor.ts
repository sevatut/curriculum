import { readSession } from '@/shared/api/session-store'
import type { Actor } from '@/entities/user/model/access'
import { getCurrentUser } from '@/entities/user/api/get-current-user'

export async function getActor(): Promise<Actor | null> {
  const session = await readSession()
  if (!session) return null

  return getCurrentUser(session.user.id)
}
