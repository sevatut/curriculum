'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'
import { useActionState, useState, type FormEvent } from 'react'

import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput'
import { TextField } from '@/shared/ui/TextField/TextField'

import { loginAction, signupAction } from '../api/auth-actions'
import { credentialsFieldError } from '../model/credentials'
import { AuthForm, authFieldClassName } from './auth-form'

type CredentialsFormProps = {
  intent: 'login' | 'signup'
}

export function CredentialsForm({ intent }: CredentialsFormProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('auth')
  const authenticate = intent === 'login' ? loginAction : signupAction
  const [state, formAction, pending] = useActionState(authenticate.bind(null, lng), {})
  const [fieldError, setFieldError] = useState<string>()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')
    const error = credentialsFieldError(email, password, intent)

    if (!error) {
      setFieldError(undefined)
      return
    }

    event.preventDefault()
    setFieldError(error)
  }

  const error = shownError(fieldError ?? state.error, pending, t)

  return (
    <AuthForm
      action={formAction}
      pending={pending}
      error={error}
      onSubmit={onSubmit}
      submitLabel={intent === 'login' ? t('login') : t('action')}
    >
      <TextField
        name="email"
        type="text"
        inputMode="email"
        label={t('email')}
        aria-label={t('email')}
        autoComplete="email"
        required
        className={authFieldClassName}
      />
      <PasswordInput
        name="password"
        label={t('password')}
        aria-label={t('password')}
        autoComplete={intent === 'login' ? 'current-password' : 'new-password'}
        required
        className={authFieldClassName}
      />
    </AuthForm>
  )
}

const localErrorKey = {
  required: 'error.required',
  generic: 'error.generic',
  emailTaken: 'error.emailTaken',
  invalidEmail: 'error.invalidEmail',
  weakPassword: 'error.weakPassword',
  userNotFound: 'error.userNotFound',
  invalidCredentials: 'error.invalidCredentials',
} as const

function shownError(
  error: string | undefined,
  pending: boolean,
  t: (key: (typeof localErrorKey)[keyof typeof localErrorKey]) => string,
) {
  if (!error || pending) return
  if (error in localErrorKey)
    return t(localErrorKey[error as keyof typeof localErrorKey])

  return t(localErrorKey.generic)
}
