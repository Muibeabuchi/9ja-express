import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionShellProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  centered?: boolean
}

export function SectionShell({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
  contentClassName,
  centered = false,
}: SectionShellProps) {
  return (
    <section className={cn("relative max-w-full overflow-hidden px-4 py-20 sm:px-6 md:py-28", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div
          className={cn(
            "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
            centered && "items-center text-center md:flex-col md:items-center"
          )}
        >
          <div className={cn("max-w-3xl", centered && "flex flex-col items-center")}>
            {eyebrow ? (
              <span className="mb-4 inline-flex rounded-full border border-[color:rgb(212_165_74_/_0.22)] bg-[color:rgb(212_165_74_/_0.08)] px-4 py-2 font-label text-[0.68rem] font-extrabold tracking-[0.28em] text-primary uppercase">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="max-w-3xl font-headline text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>

        <div className={cn("max-w-full", contentClassName)}>{children}</div>
      </div>
    </section>
  )
}
