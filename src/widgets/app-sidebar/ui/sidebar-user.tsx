'use client'

import { LogoutButton } from '@/features/auth/logout'

type SidebarUserProps = {
  name: string
  lng: string
}

export function SidebarUser({ name, lng }: SidebarUserProps) {
  const initial = name.trim().charAt(0).toUpperCase()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 overflow-hidden px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-[20px] leading-5 font-medium text-primary-foreground">
          {initial}
        </span>
        <span className="truncate text-base font-normal leading-6 text-foreground group-data-[collapsible=icon]:hidden">
          {name}
        </span>
      </div>
      <LogoutButton lng={lng} />
    </div>
  )
}
