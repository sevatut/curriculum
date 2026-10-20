'use server'

import { redirect } from 'next/navigation'

import { clearSession } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'

export async function logoutAction(lng: string) {
  await clearSession()
  redirect(`/${resolveLocale(lng)}/auth/login`)
}
