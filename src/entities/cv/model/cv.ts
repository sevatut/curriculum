export type Cv = {
  id: string
  name: string
  education: string | null
  description: string | null
  user: {
    email: string
  }
}

export type CvDetails = Cv
