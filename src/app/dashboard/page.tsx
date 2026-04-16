import { FightCarousel } from "@/components/FightCarousel"
import { EventList } from "./components/EventList"

export default function DashboardPage() {
  return (
    <div className="flex w-full px-4 sm:px-6 lg:px-8 flex-1 flex-col gap-6">
      <div className="flex min-h-0 w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
        <EventList className="min-h-0 w-full min-w-0 flex-1" />
        <div className="hidden 2xl:flex w-full min-w-0 shrink-0 flex-col gap-4 2xl:max-w-xl 2xl:flex-1">
          <FightCarousel className="pb-2" />
        </div>
      </div>
    </div>
  )
}
