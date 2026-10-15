'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'
import type { FormEvent } from 'react'

import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput'
import { TextField } from '@/shared/ui/TextField/TextField'

import { AuthForm, authFieldClassName } from '../../ui/auth-form'

export function RegisterForm() {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('common')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      submitLabel={t('auth.action')}
      secondaryLabel={t('auth.hasAccount')}
      secondaryHref={`/${lng}/auth/login`}
    >
      <TextField
        name="email"
        type="email"
        label={t('auth.email')}
        aria-label={t('auth.email')}
        autoComplete="email"
        required
        className={authFieldClassName}
      />
      <PasswordInput
        name="password"
        label={t('auth.password')}
        aria-label={t('auth.password')}
        autoComplete="new-password"
        required
        className={authFieldClassName}
      />
    </AuthForm>
  )
}
