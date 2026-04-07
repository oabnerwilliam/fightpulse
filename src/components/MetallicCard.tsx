import type { ComponentProps } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type MetallicCardProps = ComponentProps<typeof Card>

/**
 * Card com aparência metálica (aço escovado): gradiente diagonal, borda clara e sombras internas.
 */
export function MetallicCard({ className, ...props }: MetallicCardProps) {
  return (
    <Card
      className={cn(
        "relative max-w-md border-0 py-0 shadow-none ring-0",
        "bg-linear-to-br from-neutral-200 via-neutral-100 to-neutral-200",
        "dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-950",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-2px_0_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.14)]",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.4),0_12px_40px_rgba(0,0,0,0.45)]",
        "ring-1 ring-inset ring-white/35 dark:ring-white/10",
        className,
      )}
      {...props}
    />
  )
}
