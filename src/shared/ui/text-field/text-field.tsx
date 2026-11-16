import { cn } from 'cn'
import { forwardRef, ReactNode } from 'react'

import Input from '@/shared/ui/input/input'

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  rightElement?: ReactNode
  label: string
  multiline?: boolean
  rows?: number
}

const labelClassName =
  'pointer-events-none absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-sm text-placeholder transition-all duration-200 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-focus'

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = '', rightElement, label, multiline = false, rows, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex w-full max-w-140 border border-input-border transition-colors duration-300 focus-within:border-focus',
          multiline
            ? 'px-3 pt-3 pb-2'
            : 'h-12 items-center justify-between gap-4 pr-4 pl-3',
          className,
        )}
      >
        {multiline ? (
          <textarea
            name={props.name}
            aria-label={props['aria-label']}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            required={props.required}
            rows={rows}
            placeholder=" "
            className="peer w-full resize-y bg-transparent text-lg text-input-text outline-none placeholder:text-transparent disabled:opacity-70"
          />
        ) : (
          <Input {...props} placeholder=" " className="peer" ref={ref} />
        )}

        <label
          className={cn(
            labelClassName,
            multiline
              ? 'peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg'
              : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-lg',
          )}
        >
          {label}
        </label>

        {rightElement}
      </div>
    )
  },
)

TextField.displayName = 'TextField'

export { TextField }
