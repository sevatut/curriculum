type SelectOption = {
  value: string
  label: string
}

export type SelectFieldProps = {
  label: string
  name: string
  options: readonly SelectOption[]
  defaultValue?: string
  disabled?: boolean
  allowEmpty?: boolean
  className?: string
  onValueChange?: (value: string) => void
}

export type SelectFieldListProps = {
  id: string
  label: string
  options: readonly SelectOption[]
  value: string
  onSelect: (value: string) => void
}
