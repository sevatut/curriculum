const MIN_PASSWORD_LENGTH = 8
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Credentials = {
  email: string
  password: string
}

export type CredentialsIntent = 'login' | 'signup'

export function credentialsFieldError(
  email: string,
  password: string,
  intent: CredentialsIntent,
) {
  if (!email || !password) return 'required'
  if (!EMAIL_PATTERN.test(email)) return 'invalidEmail'
  if (intent === 'signup' && password.length < MIN_PASSWORD_LENGTH)
    return 'weakPassword'
}
