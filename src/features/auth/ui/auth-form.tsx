import Link from 'next/link'
import type { FormEvent, ReactNode } from 'react'

import { Button } from '@/shared/ui/button'

export const authFieldClassName = 'h-12 max-w-none'

type AuthFormProps = {
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function AuthForm({
  children,
  onSubmit,
  submitLabel,
  secondaryLabel,
  secondaryHref,
}: AuthFormProps) {
  return (
    <form className="flex w-full max-w-155 flex-col items-center" onSubmit={onSubmit}>
      <div className="flex w-full flex-col gap-5">{children}</div>
      <div className="mt-15 flex flex-col items-center gap-2">
        <Button type="submit">{submitLabel}</Button>
        {secondaryLabel && secondaryHref ? (
          <Button variant="link" render={<Link href={secondaryHref} />}>
            {secondaryLabel}
          </Button>
        ) : null}
        {secondaryLabel && !secondaryHref ? (
          <Button type="button" variant="link">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </form>
  )
}
