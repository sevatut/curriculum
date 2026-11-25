'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar'
import { TooltipProvider } from '@/shared/ui/tooltip'
import { SidebarCollapseButton } from '@/widgets/app-sidebar/ui/sidebar-collapse-button'
import { SidebarNav } from '@/widgets/app-sidebar/ui/sidebar-nav'
import { SidebarUser } from '@/widgets/app-sidebar/ui/sidebar-user'

function AppSidebar({
  lng,
  userId,
  userName,
  userAvatar,
}: {
  lng: string
  userId: string
  userName: string
  userAvatar: string
}) {
  return (
    <Sidebar className="border-r-0 tracking-sidebar">
      <SidebarContent className="pt-11 tracking-sidebar">
        <SidebarNav lng={lng} />
      </SidebarContent>
      <SidebarFooter className="tracking-sidebar">
        <SidebarUser name={userName} avatar={userAvatar} lng={lng} userId={userId} />
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebarLayout({
  children,
  lng,
  userId,
  userName,
  userAvatar,
}: {
  children: React.ReactNode
  lng: string
  userId: string
  userName: string
  userAvatar: string
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          lng={lng}
          userId={userId}
          userName={userName}
          userAvatar={userAvatar}
        />
        <SidebarInset>
          <div className="flex items-center px-4 py-3 md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
