import { LanguageItem } from '@/widgets/employee-languages/ui/language-item'
import type { LanguageEntryProps } from '@/widgets/employee-languages/ui/types'

const buttonClassName =
  '-m-2 cursor-pointer rounded-(--button-radius) p-2 text-left outline-none hover:bg-foreground/12 focus-visible:ring-2 focus-visible:ring-ring/50'

export function LanguageEntry({
  language,
  label,
  selectable,
  selected,
  onToggle,
  onOpen,
}: LanguageEntryProps) {
  function toggle() {
    onToggle(language.name)
  }

  function open() {
    onOpen?.(language)
  }

  const item = (
    <LanguageItem
      name={language.name}
      proficiency={language.proficiency}
      label={label}
      selected={selected}
    />
  )

  if (selectable) {
    return (
      <li>
        <button
          type="button"
          aria-pressed={selected}
          onClick={toggle}
          className={buttonClassName}
        >
          {item}
        </button>
      </li>
    )
  }

  if (onOpen) {
    return (
      <li>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={open}
          className={buttonClassName}
        >
          {item}
        </button>
      </li>
    )
  }

  return <li>{item}</li>
}
