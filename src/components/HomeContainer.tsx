import type { ReactNode } from "react"

export function HomeContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>
  )
}
