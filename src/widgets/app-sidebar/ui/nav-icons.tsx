import type { SVGProps } from 'react'
import { cn } from 'cn'

type IconProps = SVGProps<SVGSVGElement>

function EmployeesIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      aria-hidden="true"
      className={cn('h-3.5! w-5.5!', className)}
      {...props}
    >
      <path
        d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SkillsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
      className={cn('h-3! w-5!', className)}
      {...props}
    >
      <path
        d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LanguagesIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      aria-hidden="true"
      className={cn('h-5! w-5.5!', className)}
      {...props}
    >
      <path
        d="M11.87 13.07L9.33 10.56L9.36 10.53C11.1 8.59 12.34 6.36 13.07 4H16V2H9V0H7V2H0V3.99H11.17C10.5 5.92 9.44 7.75 8 9.35C7.07 8.32 6.3 7.19 5.69 6H3.69C4.42 7.63 5.42 9.17 6.67 10.56L1.58 15.58L3 17L8 12L11.11 15.11L11.87 13.07ZM17.5 8H15.5L11 20H13L14.12 17H18.87L20 20H22L17.5 8ZM14.88 15L16.5 10.67L18.12 15H14.88Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CvsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      aria-hidden="true"
      className={cn('h-5! w-4!', className)}
      {...props}
    >
      <path
        d="M9.17 2L14 6.83V18H2V2H9.17ZM10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0ZM8 12C9.1 12 10 11.1 10 10C10 8.9 9.1 8 8 8C6.9 8 6 8.9 6 10C6 11.1 6.9 12 8 12ZM12 15.43C12 14.62 11.52 13.9 10.78 13.58C9.93 13.21 8.99 13 8 13C7.01 13 6.07 13.21 5.22 13.58C4.48 13.9 4 14.62 4 15.43V16H12V15.43Z"
        fill="currentColor"
      />
    </svg>
  )
}

export { EmployeesIcon, SkillsIcon, LanguagesIcon, CvsIcon }
