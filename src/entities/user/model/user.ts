export const userRoles = ['Employee', 'Admin'] as const

export type UserRole = (typeof userRoles)[number]

type UserCatalogRef = {
  id: string
  name: string
}

type UserProfile = {
  first_name: string
  last_name: string
  avatar: string | null
}

type UserBase = {
  id: string
  email: string
  department: UserCatalogRef | null
  position: UserCatalogRef | null
}

export type User = UserBase & {
  role: UserRole
  profile: UserProfile | null
}

export type UserDetails = UserBase & {
  profile: (UserProfile & { full_name: string }) | null
}
