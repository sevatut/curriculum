import { revalidatePath } from 'next/cache'

import { resolveLocale } from '@/shared/i18n/settings'

export function revalidateEmployee(lng: string, userId: string) {
  const locale = resolveLocale(lng)
  revalidatePath(`/${locale}/skills`, 'page')
  revalidatePath(`/${locale}/employees/${userId}`, 'layout')
}
