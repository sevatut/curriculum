export const fieldClassName =
  'group relative h-12 w-full max-w-140 border border-input-border transition-colors duration-300 focus-within:border-focus'

export const triggerClassName =
  'absolute inset-0 z-10 flex w-full cursor-pointer items-center bg-transparent pr-9 pl-3 text-left text-lg text-input-text outline-none disabled:cursor-not-allowed'

export const labelClassName = {
  base: 'pointer-events-none absolute left-3 z-20 bg-background px-1 text-placeholder transition-all duration-200',
  floated: 'top-0 -translate-y-1/2 text-sm group-focus-within:text-focus',
  resting:
    'top-1/2 -translate-y-1/2 text-lg group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:text-sm group-focus-within:text-focus',
}

export const listClassName =
  'absolute top-full right-0 left-0 z-30 max-h-48 overflow-auto border border-input-border bg-card py-1 shadow-md'

export const optionClassName =
  'flex h-9 w-full items-center truncate px-3 text-left text-sm text-input-text hover:bg-accent'
