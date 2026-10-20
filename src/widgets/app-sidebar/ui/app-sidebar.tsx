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

import { SidebarCollapseButton } from './sidebar-collapse-button'
import { SidebarNav } from './sidebar-nav'
import { SidebarUser } from './sidebar-user'

function AppSidebar({ lng, userName }: { lng: string; userName: string }) {
  return (
    <Sidebar className="border-r-0 tracking-sidebar">
      <SidebarContent className="pt-11 tracking-sidebar">
        <SidebarNav lng={lng} />
      </SidebarContent>
      <SidebarFooter className="tracking-sidebar">
        <SidebarUser name={userName} lng={lng} />
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebarLayout({
  children,
  lng,
  userName,
}: {
  children: React.ReactNode
  lng: string
  userName: string
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar lng={lng} userName={userName} />
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
