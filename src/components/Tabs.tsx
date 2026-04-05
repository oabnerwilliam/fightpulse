import { Tab } from "@/components/Tab"
import type { TabItem } from "@/components/dashboard-tabs"

type TabsProps = {
  tabs: TabItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex items-center gap-6">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          active={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  )
}
