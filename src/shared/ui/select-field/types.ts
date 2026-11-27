export type SelectOption<T extends string = string> = {
  value: T
  label: string
}

export type SelectFieldProps<T extends string = string> = {
  label: string
  name: string
  options: readonly SelectOption<T>[]
  defaultValue?: NoInfer<T>
  disabled?: boolean
  allowEmpty?: boolean
  className?: string
  onValueChange?: (value: T) => void
}

export type SelectFieldListProps = {
  id: string
  label: string
  options: readonly SelectOption[]
  value: string
  onSelect: (value: string) => void
}
