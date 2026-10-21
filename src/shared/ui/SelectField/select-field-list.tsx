import * as classes from './select-field-classes'
import type { SelectFieldListProps } from './types'

export function SelectFieldList({
  id,
  label,
  options,
  value,
  onSelect,
}: SelectFieldListProps) {
  return (
    <ul id={id} role="listbox" aria-label={label} className={classes.list}>
      {options.map((option) => (
        <li key={option.value || 'empty'} role="presentation">
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            className={classes.option(option.value === value)}
            onPointerDown={(event) => {
              event.preventDefault()
              onSelect(option.value)
            }}
          >
            {option.label || '\u00a0'}
          </button>
        </li>
      ))}
    </ul>
  )
}
