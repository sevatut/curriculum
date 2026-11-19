import type { UserRole } from '@/entities/user/model/user'

export type CreateUserInput = {
  email: string
  password: string
  role: UserRole
}

export type CreateUserData = {
  createUser: {
    id: string
  } | null
}

export type CreateUserVariables = {
  user: {
    email: string
    password_hash: string
    role: UserRole
  }
}

export type UpdateUserInput = {
  userId: string
  role?: UserRole
  departmentId: string
  positionId: string
}

export type UpdateUserData = {
  updateUser: {
    id: string
  } | null
}

export type UpdateUserVariables = {
  user: {
    userId: string
    role?: UserRole
    department_id: string | null
    position_id: string | null
  }
}

export type DeleteUserData = {
  deleteUser: {
    affected: number
  } | null
}

export type DeleteUserVariables = {
  user: {
    userId: string
  }
}
