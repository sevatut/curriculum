import { departmentDisplayName } from '@/entities/department'
import { userDisplayName } from '@/entities/user'
import { ProfileAvatar } from '@/features/user/change-avatar'
import { profileValues } from '@/widgets/employee-profile/model/profile-form-values'
import { EmployeeProfileForm } from '@/widgets/employee-profile/ui/employee-profile-form'
import type { EmployeeProfileProps } from '@/widgets/employee-profile/ui/types'

export async function EmployeeProfile({
  lng,
  user,
  editable,
  departments,
  positions,
}: EmployeeProfileProps) {
  const name = userDisplayName(user)
  const values = profileValues(user)

  return (
    <div className="flex flex-1 flex-col items-center px-6 pt-12 pb-16">
      <ProfileAvatar
        lng={lng}
        userId={user.id}
        name={name}
        src={user.profile?.avatar ?? ''}
        editable={editable}
      />

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
