'use client'

import { useT } from 'next-i18next/client'
import type { FormEvent } from 'react'

import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput'
import { TextField } from '@/shared/ui/TextField/TextField'

import { AuthForm, authFieldClassName } from '../../ui/auth-form'

export function LoginForm() {
  const { t } = useT('common')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      submitLabel={t('auth.login')}
      secondaryLabel={t('auth.forgotPassword')}
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
        autoComplete="current-password"
        required
        className={authFieldClassName}
      />
    </AuthForm>
  )
}
