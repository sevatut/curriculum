'use client'

import { cn } from 'cn'
import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

import {
  fieldClassName,
  labelClassName,
  listClassName,
  optionClassName,
  triggerClassName,
} from './select-field-classes'
import type { OptionListProps, SelectFieldProps, SelectOption } from './types'

function choicesFor(options: readonly SelectOption[], allowEmpty: boolean) {
  if (!allowEmpty) return options
  return [{ value: '', label: '' }, ...options]
}

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
  const selectedLabel = options.find((option) => option.value === value)?.label ?? ''

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  function commit(next: string) {
    setValue(next)
    setOpen(false)
    onValueChange?.(next)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open || event.key !== 'Escape') return
    event.stopPropagation()
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={cn(fieldClassName, open && 'z-30', className)}
      onKeyDown={onKeyDown}
    >
      <input type="hidden" name={name} value={value} readOnly />
      <button
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={triggerClassName}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="truncate">{selectedLabel}</span>
      </button>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 z-20 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <label
        className={cn(
          labelClassName.base,
          value ? labelClassName.floated : labelClassName.resting,
        )}
      >
        {label}
      </label>
      {open ? (
        <OptionList
          id={listId}
          label={label}
          value={value}
          options={choicesFor(options, allowEmpty)}
          onSelect={commit}
        />
      ) : null}
    </div>
  )
}

function OptionList({ id, label, value, options, onSelect }: OptionListProps) {
  return (
    <ul id={id} role="listbox" aria-label={label} className={listClassName}>
      {options.map((option) => (
        <li key={option.value || 'empty'} role="presentation">
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            className={cn(
              optionClassName,
              option.value === value && 'bg-accent font-medium',
            )}
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
