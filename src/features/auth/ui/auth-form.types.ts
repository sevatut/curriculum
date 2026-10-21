import type { ReactNode, SubmitEvent } from 'react'

export type AuthFormProps = {
  children: ReactNode
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  pending?: boolean
  error?: string
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void
}
