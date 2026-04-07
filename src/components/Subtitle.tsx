import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type SubtitleProps = ComponentProps<"p">

export function Subtitle({ className, children, ...props }: SubtitleProps) {
  if (children != null) {
    return (
      <p className={cn("text-muted-foreground", className)} {...props}>
        {children}
      </p>
    )
  }

  return (
    <p
      className={cn("text-lg text-neutral-400 sm:text-lg", className)}
      {...props}
    >
      Cards, resultados e agenda dos principais eventos — para você acompanhar o
      mundo das lutas sem perder o que importa.
    </p>
  )
}
