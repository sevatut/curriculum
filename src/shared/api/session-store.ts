import { cookies } from 'next/headers'

import {
  parseSession,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  type Session,
} from './session'

export async function readSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  return parseSession(cookieStore.get(SESSION_COOKIE_NAME)?.value)
}

export async function writeSession(session: Session) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), sessionCookieOptions())
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
