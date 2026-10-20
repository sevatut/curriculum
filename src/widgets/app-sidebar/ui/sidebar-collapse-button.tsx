'use client'

import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
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
