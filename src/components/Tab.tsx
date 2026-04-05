import { cn } from "../lib/utils"

const tabClassName =
  "relative inline-flex cursor-pointer pb-1 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:content-[''] after:transition-[width] after:duration-300 after:ease-[ease] hover:after:w-full"

type TabProps = {
  label: string
  active: boolean
  onClick: () => void
}

export function Tab({ label, active, onClick }: TabProps) {
  return (
    <div className={tabClassName} onClick={onClick}>
      <span
        className={cn(
          "text-2xl font-bold",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label.toUpperCase()}
      </span>
    </div>
  )
}
