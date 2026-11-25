'use client'

import Link from 'next/link'

import { userInitial } from '@/entities/user/model/user-name'
import { UserAvatar } from '@/entities/user/ui/user-avatar'
import { LogoutButton } from '@/features/auth/logout'
import { appRoutes } from '@/shared/routes'

type SidebarUserProps = {
  name: string
  avatar: string
  lng: string
  userId: string
}

const profileClassName =
  'flex items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 outline-none hover:bg-sidebar-accent-hover focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'

export function SidebarUser({ name, avatar, lng, userId }: SidebarUserProps) {
  return (
    <div className="flex flex-col gap-1">
      <ProfileIdentity
        href={userId ? appRoutes.employees.profile(lng, userId) : ''}
        name={name}
        avatar={avatar}
      />
      <LogoutButton lng={lng} />
    </div>
  )
}

function ProfileIdentity({
  href,
  name,
  avatar,
}: {
  href: string
  name: string
  avatar: string
}) {
  const content = (
    <>
      <UserAvatar src={avatar} initial={userInitial(name)} />
      <span
        aria-hidden
        className="truncate text-base font-normal leading-6 text-foreground group-data-[collapsible=icon]:hidden"
      >
        {name}
      </span>
      <span className="sr-only">{name}</span>
    </>
  )

  if (!href) {
    return <div className={profileClassName}>{content}</div>
  }

  return (
    <Link href={href} className={profileClassName}>
      {content}
    </Link>
  )
}
