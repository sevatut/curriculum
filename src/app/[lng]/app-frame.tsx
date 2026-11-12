'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthPath } from '@/shared/routes'
import { AppHeader, BreadcrumbProvider } from '@/widgets/app-header'
import { AppSidebarLayout } from '@/widgets/app-sidebar'

export function AppFrame({
  lng,
  userName,
  children,
}: {
  lng: string
  userName: string
  children: ReactNode
}) {
  const pathname = usePathname()

  if (isAuthPath(pathname, lng)) {
    return children
  }

  return (
    <BreadcrumbProvider>
      <AppSidebarLayout lng={lng} userName={userName}>
        <AppHeader lng={lng} />
        {children}
      </AppSidebarLayout>
    </BreadcrumbProvider>
  )
}
