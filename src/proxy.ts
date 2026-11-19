import { NextResponse, type NextRequest } from 'next/server'
import { createProxy } from 'next-i18next/proxy'

import { parseSession, sessionCookieName } from '@/shared/api/session'
import { i18nConfig } from '@/shared/i18n/config'
import { isLocale, type Locale } from '@/shared/i18n/settings'
import { appRoutes, isAuthPath } from '@/shared/routes'

const i18nProxy = createProxy(i18nConfig)

function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/')[1] ?? ''
  return isLocale(segment) ? segment : null
}

function redirectToLogin(request: NextRequest, lng: Locale) {
  const url = request.nextUrl.clone()
  url.pathname = appRoutes.auth.login(lng)
  const response = NextResponse.redirect(url)

  if (request.cookies.has(sessionCookieName)) {
    response.cookies.delete({ name: sessionCookieName, path: '/' })
  }

  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const lng = localeFromPathname(pathname)

  if (lng) {
    if (pathname === appRoutes.auth.logout(lng)) {
      return redirectToLogin(request, lng)
    }

    const session = parseSession(request.cookies.get(sessionCookieName)?.value)
    const authPath = isAuthPath(pathname, lng)

    if (!session && !authPath) {
      return redirectToLogin(request, lng)
    }

    if (session && authPath) {
      const url = request.nextUrl.clone()
      url.pathname = appRoutes.home(lng)
      return NextResponse.redirect(url)
    }
  }

  return i18nProxy(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)'],
}
