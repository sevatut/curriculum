import { getT } from 'next-i18next/server'

import { CredentialsForm } from '@/features/auth/ui/credentials-form'
import { AuthPage } from '@/features/auth/ui/auth-page'

export async function generateMetadata() {
  const { t } = await getT('auth')

  return {
    title: t('login'),
  }
}

export default async function LoginPage() {
  const { t } = await getT('auth')

  return (
    <AuthPage title={t('greeting')} subtitle={t('welcome.login')}>
      <CredentialsForm intent="login" />
    </AuthPage>
  )
}
