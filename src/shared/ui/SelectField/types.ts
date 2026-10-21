export type SelectOption = {
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

export type OptionListProps = {
  id: string
  label: string
  value: string
  options: readonly SelectOption[]
  onSelect: (value: string) => void
}
