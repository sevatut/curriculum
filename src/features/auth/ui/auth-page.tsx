import type { ReactNode } from 'react'

type AuthPageProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthPage({ title, subtitle, children }: AuthPageProps) {
  return (
    <div className="flex flex-1 flex-col items-center px-6 pt-55">
      <h1 className="mb-6.5 text-center text-[34px] font-normal leading-8.5 tracking-heading text-foreground">
        {title}
      </h1>
      <p className="mb-10 text-center text-[16px] font-normal leading-6 tracking-basic text-foreground">
        {subtitle}
      </p>
      {children}
    </div>
  )
}
