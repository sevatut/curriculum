'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { AppHeader } from '@/widgets/app-header'
import { AppSidebarLayout } from '@/widgets/app-sidebar'

function isAuthPath(pathname: string) {
  return pathname.split('/').includes('auth')
}

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

  if (isAuthPath(pathname)) {
    return children
  }

  return (
    <AppSidebarLayout lng={lng} userName={userName}>
      <AppHeader />
      {children}
    </AppSidebarLayout>
  )
}
