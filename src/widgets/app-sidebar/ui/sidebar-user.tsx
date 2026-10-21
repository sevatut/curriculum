'use client'

import { userInitial } from '@/entities/user/model/user-name'
import { UserAvatar } from '@/entities/user/ui/user-avatar'
import { LogoutButton } from '@/features/auth/logout'

type SidebarUserProps = {
  name: string
  lng: string
}

export function SidebarUser({ name, lng }: SidebarUserProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 overflow-hidden px-2 py-1.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <UserAvatar src="" initial={userInitial(name)} />
        <span className="truncate text-base font-normal leading-6 text-foreground group-data-[collapsible=icon]:hidden">
          {name}
        </span>
      </div>
      <LogoutButton lng={lng} />
    </div>
  )
}
