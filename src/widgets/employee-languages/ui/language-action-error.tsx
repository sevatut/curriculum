'use client'

import { useT } from 'next-i18next/client'

import { errorKey } from '@/widgets/employee-languages/model/language-error'
import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'

export function LanguageActionErrorMessage({ error }: { error?: LanguageActionError }) {
  const { t } = useT('employees')
  if (!error) return null

  return (
    <p role="alert" className="text-sm text-destructive">
      {t(errorKey[error])}
    </p>
  )
}
