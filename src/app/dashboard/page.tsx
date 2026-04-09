import { FightCarousel } from "@/components/FightCarousel"
import { EventList } from "./components/EventList"

export default function DashboardPage() {
  return (
    <div className="flex w-full px-4 sm:px-6 lg:px-8 flex-1 flex-col gap-6">
      <div className="shrink-0 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Bem-vindo ao Dashboard!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Aqui você pode ver todas as lutas e apostas
        </p>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
        <EventList className="min-h-0 w-full min-w-0 flex-1" />
        <div className="flex w-full min-w-0 shrink-0 flex-col gap-4 lg:max-w-xl lg:flex-1">
          <FightCarousel className="pb-2" />
        </div>
      </div>
    </div>
  )
}
