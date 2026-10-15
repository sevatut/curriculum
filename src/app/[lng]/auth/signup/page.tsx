import { getT } from 'next-i18next/server'

import { RegisterForm } from '@/features/auth/register'
import { AuthPage } from '@/features/auth/ui/auth-page'

export async function generateMetadata() {
  const { t } = await getT('common')

  return {
    title: t('auth.register'),
  }
}

export default async function SignupPage() {
  const { t } = await getT('common')

  return (
    <AuthPage title={t('auth.register')} subtitle={t('auth.welcome.register')}>
      <RegisterForm />
    </AuthPage>
  )
}
