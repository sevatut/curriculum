import { getT } from 'next-i18next/server'

import { CredentialsForm } from '@/features/auth/ui/credentials-form'
import { AuthPage } from '@/features/auth/ui/auth-page'

export async function generateMetadata() {
  const { t } = await getT('auth')

  return {
    title: t('register'),
  }
}

export default async function SignupPage() {
  const { t } = await getT('auth')

  return (
    <AuthPage title={t('register')} subtitle={t('welcome.register')}>
      <CredentialsForm intent="signup" />
    </AuthPage>
  )
}
