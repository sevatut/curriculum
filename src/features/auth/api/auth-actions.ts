'use server'

import { redirect } from 'next/navigation'

import { writeSession } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'

import type { AuthActionState } from '../model/auth-action-state'
import type { AuthAttempt } from '../model/auth-attempt'
import { parseCredentials, type CredentialsIntent } from '../model/credentials'
import { signIn, signUp } from './authenticate'

type Authenticate = (input: { email: string; password: string }) => Promise<AuthAttempt>

async function runAuthAction(
  lng: string,
  formData: FormData,
  authenticate: Authenticate,
  intent: CredentialsIntent,
): Promise<AuthActionState> {
  const parsed = parseCredentials(formData, intent)
  if (!parsed.success) return { error: parsed.formError }

  const result = await authenticate(parsed.data)

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
