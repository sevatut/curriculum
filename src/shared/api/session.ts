export const SESSION_COOKIE_NAME = 'session'

export function authLogoutPath(lng: string) {
  return `/${lng}/auth/logout`
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 7

export type SessionUser = {
  id: string
  email: string
  name: string
}

export type Session = {
  accessToken: string
  user: SessionUser
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}

export function parseSession(value: string | undefined): Session | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as Partial<Session>
    const user = parsed.user

    if (!parsed.accessToken || !user?.id || !user.email || !user.name) {
      return null
    }

    return {
      accessToken: parsed.accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  } catch {
    return null
  }
}
