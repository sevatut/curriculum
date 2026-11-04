import type { UserRole } from '@/entities/user/model/user'

export type Actor = {
  id: string
  role: UserRole
}

export function isAdmin(actor: Actor | null) {
  return actor?.role === 'Admin'
}

export function canEditProfile(actor: Actor | null, targetUserId: string) {
  return isAdmin(actor) || actor?.id === targetUserId
}
