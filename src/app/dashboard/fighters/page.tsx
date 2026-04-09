import { FighterList } from "../components/FighterList"

export default function DashboardFightersPage() {
  return (
    <div className="flex w-full max-w-6xl flex-1 flex-col gap-6 px-4">
      <div className="shrink-0 text-center">
        <h1 className="text-4xl font-bold text-primary">Lutadores</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pesquise e explore perfis de lutadores
        </p>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
        <FighterList className="min-h-0 flex-1" />
      </div>
    </div>
  )
}
