type SessionUser = {
  id: string
  email: string
  name: string
}

export type Session = {
  accessToken: string
  user: SessionUser
}
