export type UserRole = 'Admin' | 'Employee' | 'Manager'

export type User = {
  id: string
  email: string
  department_name: string | null
  position_name: string | null
  profile: {
    first_name: string
    last_name: string
    avatar: string | null
  } | null
}

type UserCatalogRef = {
  id: string
  name: string
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
