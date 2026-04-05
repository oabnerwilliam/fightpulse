"use client"

import { Tabs } from "@/components/Tabs"
import { parseAsStringEnum, useQueryState } from "nuqs"
import { FighterList } from "../../components/FighterList"
import { dashboardTabs } from "./utils"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum(dashboardTabs.map((tab) => tab.id)),
  )

  return (
    <div className="flex w-full max-w-6xl flex-1 flex-col gap-6 py-10">
      <div className="shrink-0 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Bem-vindo ao Dashboard!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Aqui você pode ver todas as lutas e apostas
        </p>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
        <div className="shrink-0 flex justify-center">
          <Tabs
            tabs={dashboardTabs}
            activeTab={activeTab || "FIGHTERS"}
            setActiveTab={setActiveTab}
          />
        </div>
        {activeTab === "FIGHTERS" ? (
          <FighterList className="min-h-0 flex-1" />
        ) : null}
        {/* {activeTab === "FIGHTS" && <FightList fights={fights} />} */}
      </div>
    </div>
  )
}
