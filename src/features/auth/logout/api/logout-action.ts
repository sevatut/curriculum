'use server'

import { redirect } from 'next/navigation'

import { clearSession } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'

export async function logoutAction(lng: string) {
  await clearSession()
  redirect(appRoutes.auth.login(resolveLocale(lng)))
}
