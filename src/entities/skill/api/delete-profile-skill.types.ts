import type { ProfileSkillMutationData } from '@/entities/skill/api/profile-skill-mutation.types'

export type DeleteProfileSkillInput = {
  userId: string
  name: string
}

export type DeleteProfileSkillVariables = {
  skill: DeleteProfileSkillInput
}

export type DeleteProfileSkillData = ProfileSkillMutationData<'deleteProfileSkill'>
