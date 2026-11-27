import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'

export const errorKey = {
  required: 'languages.errorRequired',
  duplicate: 'languages.errorDuplicate',
  forbidden: 'languages.errorForbidden',
  generic: 'languages.errorGeneric',
} as const satisfies Record<LanguageActionError, `languages.error${string}`>
