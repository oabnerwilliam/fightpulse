import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type TitleProps = ComponentProps<"h1">

export function Title({ className, children, ...props }: TitleProps) {
  if (children != null) {
    return (
      <h1
        className={cn("text-foreground font-bold tracking-tight", className)}
        {...props}
      >
        {children}
      </h1>
    )
  }

  return (
    <h1
      className={cn(
        "text-foreground text-9xl font-bold tracking-tight sm:text-6xl",
        className,
      )}
      {...props}
    >
      Tudo sobre lutas,
      <span className="hero-title-red-shine inline-block">
        {" "}
        em um só lugar.
      </span>
    </h1>
  )
}
