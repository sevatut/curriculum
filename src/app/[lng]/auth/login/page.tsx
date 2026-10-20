import { getT } from 'next-i18next/server'

import { CredentialsForm } from '@/features/auth/ui/credentials-form'
import { AuthPage } from '@/features/auth/ui/auth-page'

export async function generateMetadata() {
  const { t } = await getT('common')

  return {
    title: t('auth.login'),
  }
}

export default async function LoginPage() {
  const { t } = await getT('common')

  return (
    <AuthPage title={t('auth.greeting')} subtitle={t('auth.welcome.login')}>
      <CredentialsForm intent="login" />
    </AuthPage>
  )
}
