import type { Department } from '@/entities/department'
import type { Position } from '@/entities/position'
import type { UserDetails } from '@/entities/user'

import type { ProfileFormValues } from '../model/profile-form-values'

export type EmployeeProfileProps = {
  lng: string
  user: UserDetails
  editable: boolean
  departments: readonly Department[]
  positions: readonly Position[]
}

export type CatalogOption = {
  id: string
  name: string
}

export type EmployeeProfileFormProps = {
  lng: string
  userId: string
  editable: boolean
  values: ProfileFormValues
  departments: readonly CatalogOption[]
  positions: readonly CatalogOption[]
}
