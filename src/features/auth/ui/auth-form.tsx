import type { FormEvent, ReactNode } from 'react'

import { Button } from '@/shared/ui/button'

export const authFieldClassName = 'h-12 max-w-none'

type AuthFormProps = {
  children: ReactNode
  action: (formData: FormData) => void | Promise<void>
  submitLabel: string
  pending?: boolean
  error?: string
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({
  children,
  action,
  submitLabel,
  pending = false,
  error,
  onSubmit,
}: AuthFormProps) {
  return (
    <form
      className="flex w-full max-w-155 flex-col items-center"
      action={action}
      noValidate
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col gap-5">{children}</div>
      <div className="mt-15 flex flex-col items-center gap-2">
        {error ? (
          <p
            role="alert"
            className="mb-2 max-w-155 text-center text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
