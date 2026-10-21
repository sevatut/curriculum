type NamedProfile = {
  email: string
  profile: {
    first_name: string
    last_name: string
    full_name?: string
  } | null
}

export function userDisplayName(user: NamedProfile) {
  const profile = user.profile
  if (!profile) return user.email

  const fullName = profile.full_name?.trim()
  if (fullName) return fullName

  const composed = `${profile.first_name} ${profile.last_name}`.trim()
  return composed || user.email
}

export function userInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?'
}
