'use client'

import { cn } from 'cn'
import { ChevronDown } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import * as classes from './select-field-classes'
import type { SelectFieldProps } from './types'
import { useOutsidePointerDown } from './use-outside-pointer-down'

export function SelectField({
  label,
  name,
  options,
  defaultValue = '',
  disabled = false,
  allowEmpty = true,
  className,
  onValueChange,
}: SelectFieldProps) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const choices = allowEmpty ? [{ value: '', label: '' }, ...options] : options
  const selectedLabel = options.find((option) => option.value === value)?.label

  useOutsidePointerDown(rootRef, open, () => setOpen(false))

  return (
    <div
      ref={rootRef}
      className={cn(classes.field, open && 'z-30', className)}
      onKeyDown={(event) => {
        if (!open || event.key !== 'Escape') return
        event.stopPropagation()
        setOpen(false)
      }}
    >
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={classes.trigger}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">{selectedLabel}</span>
      </button>
      <ChevronDown aria-hidden className={classes.chevron} />
      <label className={classes.label(Boolean(value))}>{label}</label>
      {open && (
        <ul id={listId} role="listbox" aria-label={label} className={classes.list}>
          {choices.map((option) => (
            <li key={option.value || 'empty'} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={classes.option(option.value === value)}
                onPointerDown={(event) => {
                  event.preventDefault()
                  setValue(option.value)
                  setOpen(false)
                  onValueChange?.(option.value)
                }}
              >
                {option.label || '\u00a0'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
