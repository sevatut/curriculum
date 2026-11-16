import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'

export const errorKey = {
  required: 'skills.errorRequired',
  duplicate: 'skills.errorDuplicate',
  forbidden: 'skills.errorForbidden',
  generic: 'skills.errorGeneric',
} as const satisfies Record<SkillActionError, `skills.error${string}`>
