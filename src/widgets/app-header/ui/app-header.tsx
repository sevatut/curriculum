'use client'

import { AppBreadcrumbs } from './app-breadcrumbs'

export function AppHeader({ lng }: { lng: string }) {
  return (
    <header className="flex h-11 shrink-0 items-start px-5 pt-4">
      <AppBreadcrumbs lng={lng} />
    </header>
  )
}
