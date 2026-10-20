'use client'

import { LogOut } from 'lucide-react'
import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'

import { logoutAction } from '../api/logout-action'

export function LogoutButton({ lng }: { lng: string }) {
  const { t } = useT('common')

  return (
    <form
      action={logoutAction.bind(null, lng)}
      className="px-2 group-data-[collapsible=icon]:px-0"
    >
      <Button
        type="submit"
        variant="transparent"
        size="compact"
        aria-label={t('auth.logout')}
        className="text-sidebar-foreground/70 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:px-0"
      >
        <LogOut size={18} />
        <span className="group-data-[collapsible=icon]:hidden">{t('auth.logout')}</span>
      </Button>
    </form>
  )
}
