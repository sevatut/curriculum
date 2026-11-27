import type { ProfileSkill } from '@/entities/skill/model/skill'
import { SkillItem } from '@/entities/skill/ui/skill-item'
import type { SkillGroup } from '@/widgets/employee-skills/model/skill-groups'

type SkillGroupListProps = {
  groups: SkillGroup[]
  selectable: boolean
  selected: readonly string[]
  onToggle: (name: string) => void
  onOpen?: (skill: ProfileSkill) => void
}

const buttonClassName =
  '-m-2 cursor-pointer rounded-sm p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

export function SkillGroupList({
  groups,
  selectable,
  selected,
  onToggle,
  onOpen,
}: SkillGroupListProps) {
  return (
    <div className="flex flex-col gap-11">
      {groups.map((group) => (
        <section key={group.id}>
          <h2 className="text-base text-foreground">{group.name}</h2>
          <ul className="mt-7 grid grid-cols-3 gap-x-0 gap-y-6 pl-4">
            {group.skills.map((skill) => {
              const checked = selected.includes(skill.name)

              return (
                <li key={skill.id}>
                  {selectable ? (
                    <button
                      type="button"
                      aria-pressed={checked}
                      onClick={() => onToggle(skill.name)}
                      className={buttonClassName}
                    >
                      <SkillItem
                        name={skill.name}
                        mastery={skill.mastery}
                        selected={checked}
                      />
                    </button>
                  ) : onOpen ? (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => onOpen(skill)}
                      className={buttonClassName}
                    >
                      <SkillItem name={skill.name} mastery={skill.mastery} />
                    </button>
                  ) : (
                    <SkillItem name={skill.name} mastery={skill.mastery} />
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
