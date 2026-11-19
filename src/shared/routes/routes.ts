const authRoot = (lng: string) => `/${lng}/auth`
const employeesRoot = (lng: string) => `/${lng}/employees`
const employeeRoot = (lng: string, userId: string) => `${employeesRoot(lng)}/${userId}`
const cvsRoot = (lng: string) => `/${lng}/cvs`
const cvRoot = (lng: string, cvId: string) => `${cvsRoot(lng)}/${cvId}`

export const appRoutes = {
  home: (lng: string) => `/${lng}`,
  auth: {
    login: (lng: string) => `${authRoot(lng)}/login`,
    signup: (lng: string) => `${authRoot(lng)}/signup`,
    logout: (lng: string) => `${authRoot(lng)}/logout`,
  },
  employees: {
    list: employeesRoot,
    item: employeeRoot,
    profile: (lng: string, userId: string) => `${employeeRoot(lng, userId)}/profile`,
    skills: (lng: string, userId: string) => `${employeeRoot(lng, userId)}/skills`,
    languages: (lng: string, userId: string) =>
      `${employeeRoot(lng, userId)}/languages`,
  },
  cvs: {
    list: cvsRoot,
    details: (lng: string, cvId: string) => `${cvRoot(lng, cvId)}/details`,
    skills: (lng: string, cvId: string) => `${cvRoot(lng, cvId)}/skills`,
    projects: (lng: string, cvId: string) => `${cvRoot(lng, cvId)}/projects`,
    preview: (lng: string, cvId: string) => `${cvRoot(lng, cvId)}/preview`,
  },
  skills: {
    list: (lng: string) => `/${lng}/skills`,
  },
  languages: {
    list: (lng: string) => `/${lng}/languages`,
  },
} as const

export function isAuthPath(pathname: string, lng: string) {
  const root = authRoot(lng)
  return pathname === root || pathname.startsWith(`${root}/`)
}
