import { NextResponse, type NextRequest } from 'next/server'
import { createProxy } from 'next-i18next/proxy'

import { authLogoutPath, parseSession, SESSION_COOKIE_NAME } from '@/shared/api/session'
import { i18nConfig } from '@/shared/i18n/config'
import { isLocale, type Locale } from '@/shared/i18n/settings'

const i18nProxy = createProxy(i18nConfig)

function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/')[1] ?? ''
  return isLocale(segment) ? segment : null
}

function isAuthPath(pathname: string, lng: Locale) {
  return pathname === `/${lng}/auth` || pathname.startsWith(`/${lng}/auth/`)
}

function redirectToLogin(request: NextRequest, lng: Locale) {
  const url = request.nextUrl.clone()
  url.pathname = `/${lng}/auth/login`
  const response = NextResponse.redirect(url)

  if (request.cookies.has(SESSION_COOKIE_NAME)) {
    response.cookies.delete({ name: SESSION_COOKIE_NAME, path: '/' })
  }

  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const lng = localeFromPathname(pathname)

  if (lng) {
    if (pathname === authLogoutPath(lng)) {
      return redirectToLogin(request, lng)
    }

    const session = parseSession(request.cookies.get(SESSION_COOKIE_NAME)?.value)
    const authPath = isAuthPath(pathname, lng)

    if (!session && !authPath) {
      return redirectToLogin(request, lng)
    }

    if (session && authPath) {
      const url = request.nextUrl.clone()
      url.pathname = `/${lng}`
      return NextResponse.redirect(url)
    }
  }

  return i18nProxy(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)'],
}
