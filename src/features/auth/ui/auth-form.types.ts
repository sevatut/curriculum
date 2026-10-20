import type { FormEvent, ReactNode } from 'react'

export type AuthFormProps = {
  children: ReactNode
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  pending?: boolean
  error?: string
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}
