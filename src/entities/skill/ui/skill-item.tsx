type Mastery = 'Novice' | 'Advanced' | 'Competent' | 'Expert' | 'Master'

type SkillItemProps = {
  name: string
  mastery: Mastery
}

const masteryBgClasses: Record<Mastery, string> = {
  Novice: 'bg-novice',
  Advanced: 'bg-advanced',
  Competent: 'bg-competent',
  Expert: 'bg-expert',
  Master: 'bg-master',
}

const masteryBarClasses: Record<Mastery, string> = {
  Novice: 'bg-novice-bar',
  Advanced: 'bg-advanced-bar',
  Competent: 'bg-competent-bar',
  Expert: 'bg-expert-bar',
  Master: 'bg-master',
}

const masteryProgress: Record<Mastery, number> = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Expert: 80,
  Master: 100,
}

export function SkillItem({ name, mastery }: SkillItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-1 w-20 ${masteryBgClasses[mastery]}`}>
        <div
          className={`h-1 ${masteryBarClasses[mastery]}`}
          style={{ width: `${masteryProgress[mastery]}%` }}
        ></div>
      </div>
      <h2 className="text-skill-text">{name}</h2>
    </div>
  )
}
