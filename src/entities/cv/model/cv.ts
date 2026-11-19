export type Cv = {
  id: string
  name: string
  education: string | null
  description: string | null
  user: {
    id: string
    email: string
  }
}
