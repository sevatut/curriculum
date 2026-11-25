'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthPath } from '@/shared/routes'
import { AppHeader, BreadcrumbProvider } from '@/widgets/app-header'
import { AppSidebarLayout } from '@/widgets/app-sidebar'

export function AppFrame({
  lng,
  userId,
  userName,
  userAvatar,
  children,
}: {
  lng: string
  userId: string
  userName: string
  userAvatar: string
  children: ReactNode
}) {
  const pathname = usePathname()

  if (isAuthPath(pathname, lng)) {
    return children
  }

  return (
    <BreadcrumbProvider>
      <AppSidebarLayout
        lng={lng}
        userId={userId}
        userName={userName}
        userAvatar={userAvatar}
      >
        <AppHeader lng={lng} />
        {children}
      </AppSidebarLayout>
    </BreadcrumbProvider>
  )
}
