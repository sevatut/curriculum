'use client'

import { cn } from 'cn'
import { ChevronDown } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import * as classes from './select-field-classes'
import { SelectFieldList } from './select-field-list'
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
        <SelectFieldList
          id={listId}
          label={label}
          options={choices}
          value={value}
          onSelect={(nextValue) => {
            setValue(nextValue)
            setOpen(false)
            onValueChange?.(nextValue)
          }}
        />
      )}
    </div>
  )
}
