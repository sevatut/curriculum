'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { canDeleteUser, isAdmin } from '@/entities/user/model/access'
import { appRoutes } from '@/shared/routes'
import { EmployeeAdminMenu } from '@/widgets/employee-table/ui/employee-admin-menu'
import { EmployeeProfileLink } from '@/widgets/employee-table/ui/employee-profile-link'
import type { EmployeeRowActionsProps } from '@/widgets/employee-table/ui/types'

export function EmployeeRowActions({
  row,
  actor,
  departments,
  positions,
}: EmployeeRowActionsProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('employees')

  if (!isAdmin(actor)) {
    return (
      <EmployeeProfileLink
        href={appRoutes.employees.profile(lng, row.id)}
        label={t('actions')}
      />
    )
  }

  return (
    <EmployeeAdminMenu
      row={row}
      deletable={canDeleteUser(actor, row.id)}
      departments={departments}
      positions={positions}
    />
  )
}
