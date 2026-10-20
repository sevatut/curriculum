'use server'

import { redirect } from 'next/navigation'

import { writeSession } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'

import type { AuthActionState } from '../model/auth-action-state'
import { credentialsFieldError, type CredentialsIntent } from '../model/credentials'
import { signIn, signUp, type AuthAttempt } from './authenticate'

type Authenticate = (input: { email: string; password: string }) => Promise<AuthAttempt>

async function runAuthAction(
  lng: string,
  formData: FormData,
  authenticate: Authenticate,
  intent: CredentialsIntent,
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const error = credentialsFieldError(email, password, intent)

  if (error) return { error }

  const result = await authenticate({ email, password })

  if ('error' in result) {
    return { error: result.error }
  }

  await writeSession(result.session)
  redirect(`/${resolveLocale(lng)}`)
}

export async function loginAction(
  lng: string,
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  return runAuthAction(lng, formData, signIn, 'login')
}

export async function signupAction(
  lng: string,
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  return runAuthAction(lng, formData, signUp, 'signup')
}
