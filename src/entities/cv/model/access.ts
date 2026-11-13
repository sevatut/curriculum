import { isAdmin, type Actor } from '@/entities/user/model/access'

export function canManageCv(actor: Actor | null, ownerId: string) {
  return isAdmin(actor) || actor?.id === ownerId
}
