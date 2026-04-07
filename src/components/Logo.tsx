import { cn } from "@/lib/utils"

type LogoProps = {
  as?: "h1" | "span"
  className?: string
}

export const Logo = ({ as = "h1", className }: LogoProps) => {
  const Comp = as
  return (
    <Comp
      className={cn(
        "font-bold tracking-wide text-foreground text-3xl",
        className,
      )}
    >
      FIGHT<span className="text-red-500">PULSE</span>
    </Comp>
  )
}
