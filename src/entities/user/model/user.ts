export const userRoles = ['Employee', 'Admin'] as const

export type UserRole = (typeof userRoles)[number]

type UserCatalogRef = {
  id: string
  name: string
}

export type User = {
  id: string
  email: string
  role: UserRole
  department_name: string | null
  position_name: string | null
  department: Pick<UserCatalogRef, 'id'> | null
  position: Pick<UserCatalogRef, 'id'> | null
  profile: {
    first_name: string
    last_name: string
    avatar: string | null
  } | null
}

export type UserDetails = {
  id: string
  email: string
  department: UserCatalogRef | null
  position: UserCatalogRef | null
  profile: {
    first_name: string
    last_name: string
    full_name: string
    avatar: string | null
  } | null
}
