'use client'

import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
import { ChevronLeftIcon } from '@/shared/ui/chevron-left-icon'
import { useSidebar } from '@/shared/ui/sidebar'

export function SidebarCollapseButton() {
  const { toggleSidebar } = useSidebar()
  const { t } = useT('common')

  return (
    <Button
      variant="transparent"
      className="mb-4 ml-2 size-10 shrink-0 hover:bg-sidebar-accent-hover text-sidebar-foreground/70 group-data-[collapsible=icon]:mx-auto"
      aria-label={t('nav.collapse')}
      onClick={toggleSidebar}
    >
      <ChevronLeftIcon className="transition-transform group-data-[state=collapsed]:rotate-180" />
    </Button>
  )
}
