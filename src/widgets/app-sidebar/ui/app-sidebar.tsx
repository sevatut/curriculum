'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from 'next-i18next/client'
import type { ComponentType, SVGProps } from 'react'

import { Button } from '@/shared/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui/sidebar'
import { TooltipProvider } from '@/shared/ui/tooltip'

import { CvsIcon, EmployeesIcon, LanguagesIcon, SkillsIcon } from './nav-icons'

// TODO: Подставить данные пользователя
const SIDEBAR_USER = {
  name: 'Test User',
  initial: 'T',
}

const NAV_ITEMS = [
  { path: '/employees', labelKey: 'navEmployees', icon: EmployeesIcon },
  { path: '/skills', labelKey: 'navSkills', icon: SkillsIcon },
  { path: '/languages', labelKey: 'navLanguages', icon: LanguagesIcon },
  { path: '/cvs', labelKey: 'navCvs', icon: CvsIcon },
] as const satisfies ReadonlyArray<{
  path: string
  labelKey: 'navEmployees' | 'navSkills' | 'navLanguages' | 'navCvs'
  icon: ComponentType<SVGProps<SVGSVGElement>>
}>

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}
// TODO: Подставить данные пользователя
function SidebarUser() {
  return (
    <div className="flex items-center gap-2 overflow-hidden px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-[20px] leading-5 font-medium text-primary-foreground">
        {SIDEBAR_USER.initial}
      </span>
      <span className="truncate text-base font-normal leading-6 text-foreground group-data-[collapsible=icon]:hidden">
        {SIDEBAR_USER.name}
      </span>
    </div>
  )
}

function SidebarCollapseButton() {
  const { toggleSidebar } = useSidebar()
  const { t } = useT('common')

  return (
    <Button
      variant="transparent"
      className="mb-4 ml-2 size-10 shrink-0 hover:bg-sidebar-accent-hover text-sidebar-foreground/70 group-data-[collapsible=icon]:mx-auto"
      aria-label={t('collapseSidebar')}
      onClick={toggleSidebar}
    >
      <svg
        width="7.4"
        height="12"
        viewBox="0 0 7.4 12"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform group-data-[state=collapsed]:rotate-180"
      >
        <path
          d="M6.65 0.75L0.75 6L6.65 11.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  )
}

function AppSidebar({ lng }: { lng: string }) {
  const pathname = usePathname()
  const { t } = useT('common')

  return (
    <Sidebar className="border-r-0 tracking-sidebar">
      <SidebarContent className="pt-11 tracking-sidebar">
        <SidebarGroup className="px-0">
          <SidebarMenu className="gap-3.5">
            {NAV_ITEMS.map((item) => {
              const href = `/${lng}${item.path}`
              const label = t(item.labelKey)
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isNavActive(pathname, href)}
                    tooltip={{ children: label, className: 'tracking-sidebar' }}
                    render={<Link href={href} />}
                    className="h-14 w-50 gap-4 p-0 text-base font-normal not-italic leading-6 text-muted-foreground hover:text-muted-foreground data-active:text-foreground data-active:font-normal group-data-[collapsible=icon]:w-12"
                  >
                    <span className="ml-4 flex size-6 shrink-0 items-center justify-center">
                      <Icon />
                    </span>
                    <span className="group-data-[collapsible=icon]:hidden">
                      {label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="tracking-sidebar">
        <SidebarUser />
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebarLayout({
  children,
  lng,
}: {
  children: React.ReactNode
  lng: string
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar lng={lng} />
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
