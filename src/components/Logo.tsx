import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cn(
        "font-bold tracking-wide text-foreground text-xl sm:text-3xl",
        className,
      )}
    >
      FIGHT<span className="text-red-500">PULSE</span>
    </h1>
  )
}
