import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Fight Pulse",
  description: "Dashboard do usuário para ver todas as lutas e apostas",
}

export default function DashboardPage() {
  return (
    <div className="flex max-w-lg flex-col items-center gap-6 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Dashboard
        </h1>
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
          Essa é sua página como usuário do Fight Pulse.
        </p>
      </div>
    </div>
  )
}
