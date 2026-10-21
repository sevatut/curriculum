import { Upload } from 'lucide-react'
import { getT } from 'next-i18next/server'

import { departmentDisplayName } from '@/entities/department'
import { userDisplayName, userInitial } from '@/entities/user'
import { UserAvatar } from '@/entities/user/ui/user-avatar'

import { profileValues } from '../model/profile-form-values'
import { EmployeeProfileForm } from './employee-profile-form'
import type { EmployeeProfileProps } from './types'

export async function EmployeeProfile({
  lng,
  user,
  editable,
  departments,
  positions,
}: EmployeeProfileProps) {
  const { t } = await getT('employees')
  const name = userDisplayName(user)
  const values = profileValues(user)

  return (
    <div className="flex flex-1 flex-col items-center px-6 pt-12 pb-16">
      <div className="flex items-center gap-8">
        <UserAvatar
          src={user.profile?.avatar ?? ''}
          initial={userInitial(name)}
          size="lg"
          tone="muted"
        />
        {editable ? (
          <button
            type="button"
            className="flex max-w-40 flex-col items-center gap-1 text-center text-sm text-foreground"
          >
            <Upload aria-hidden className="size-6" />
            <span>{t('profile.upload')}</span>
            <span className="text-xs text-muted-foreground">
              {t('profile.uploadHint')}
            </span>
          </button>
        ) : null}
      </div>

      <h1 className="mt-6 text-center text-xl font-medium text-foreground">{name}</h1>
      <p className="text-center text-sm text-muted-foreground">{user.email}</p>

      <EmployeeProfileForm
        key={`${values.firstName}\0${values.lastName}\0${values.departmentId}\0${values.positionId}`}
        lng={lng}
        userId={user.id}
        editable={editable}
        values={values}
        departments={departments.map((department) => ({
          id: department.id,
          name: departmentDisplayName(department.name),
        }))}
        positions={positions}
      />
    </div>
  )
}
