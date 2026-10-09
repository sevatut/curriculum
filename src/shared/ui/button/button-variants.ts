import { cva } from 'class-variance-authority'

// Переменная для текста кнопки
const buttonText =
  'font-sans text-sm font-medium uppercase leading-[var(--button-leading)] tracking-button'

export const buttonVariants = cva(
  // Базовые стили кнопки
  `inline-flex shrink-0 items-center justify-center border-0 whitespace-nowrap rounded-[var(--button-radius)] transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:bg-[var(--button-disabled)] disabled:text-[var(--button-disabled-foreground)] ${buttonText}`,
  {
    variants: {
      variant: {
        // Variants: в соответствии с документацией Storybook
        primary: 'bg-primary text-primary-foreground',
        transparent: 'bg-transparent text-muted-foreground hover:bg-primary/10',
        outlined:
          'border border-primary/50 bg-transparent text-primary hover:border-primary hover:bg-primary/7 disabled:border-[var(--button-disabled)] disabled:bg-transparent',
        link: 'bg-transparent text-primary hover:text-primary/80 hover:bg-primary/10',
      },
      size: {
        // - Sizes: в соответствии с дизайном Figma
        // - Narrow: (Login и Register страницы)
        // - Action: (страница CV)
        // - Form: (страница User)
        // Сompact: кнопка по ширине содержимого (Create CV)
        narrow: 'h-[var(--button-height)] w-[var(--button-width-narrow)]',
        action:
          'h-[var(--button-height)] w-[var(--button-width-action)] lg:w-[var(--button-width-form)]',
        form: 'h-[var(--button-height)] w-full min-w-[var(--button-width-form-min)] max-w-[var(--button-width-form-max)] lg:w-[var(--button-width-form)] lg:min-w-[var(--button-width-form)] lg:max-w-[var(--button-width-form)]',
        compact: 'h-10 w-auto gap-1.5 px-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'narrow',
    },
  },
)
