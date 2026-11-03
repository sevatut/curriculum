import { cookies } from 'next/headers'

import type { Session } from './session.types'
import { parseSession, sessionCookieName, sessionCookieOptions } from './session'

export async function readSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  return parseSession(cookieStore.get(sessionCookieName)?.value)
}

export async function writeSession(session: Session) {
  const cookieStore = await cookies()
  cookieStore.set(sessionCookieName, JSON.stringify(session), sessionCookieOptions())
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(sessionCookieName)
}
