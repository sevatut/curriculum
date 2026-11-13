export type CreateCvInput = {
  userId: string
  name: string
  education: string
  description: string
}

export type CreateCvData = {
  createCv: {
    id: string
  } | null
}

export type CreateCvVariables = {
  cv: {
    userId: string
    name: string
    education: string | null
    description: string | null
  }
}

export type UpdateCvInput = {
  cvId: string
  name: string
  education: string
  description: string
}

export type UpdateCvData = {
  updateCv: {
    id: string
  } | null
}

export type UpdateCvVariables = {
  cv: {
    cvId: string
    name: string
    education: string | null
    description: string | null
  }
}

export type DeleteCvData = {
  deleteCv: {
    affected: number
  } | null
}

export type DeleteCvVariables = {
  cv: {
    cvId: string
  }
}
