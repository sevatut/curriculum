'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from 'next-i18next/client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

import { NAV_ITEMS } from './nav-items'

type SidebarNavProps = {
  lng: string
}

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarNav({ lng }: SidebarNavProps) {
  const pathname = usePathname()
  const { t } = useT('common')

  return (
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
                <span className="group-data-[collapsible=icon]:hidden">{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
