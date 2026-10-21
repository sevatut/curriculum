import type { ProfileFormValues } from '../model/profile-form-values'

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
