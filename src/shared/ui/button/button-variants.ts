import { cva } from 'class-variance-authority'

const buttonText =
  'font-sans text-sm font-medium uppercase leading-[var(--button-leading)] tracking-[var(--button-tracking)]'

export const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center border-0 whitespace-nowrap rounded-[var(--button-radius)] transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:bg-[var(--button-disabled)] disabled:text-[var(--button-disabled-foreground)] ${buttonText}`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        transparent: 'bg-transparent text-subtle-foreground',
        link: 'bg-transparent text-primary',
      },
      size: {
        wide: 'h-[var(--button-height)] w-[var(--button-width-wide)]',
        action:
          'h-[var(--button-height)] w-[var(--button-width-action)] lg:w-[var(--button-width-form)]',
        form: 'h-[var(--button-height)] w-full min-w-[var(--button-width-form-min)] max-w-[var(--button-width-form-max)] lg:w-[var(--button-width-form)] lg:min-w-[var(--button-width-form)] lg:max-w-[var(--button-width-form)]',
        inline: 'h-auto w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'wide',
    },
  },
)
