import { redirect } from "next/navigation"
import { getLoggedUser } from "../services/user.service"
import { FightCarousel } from "@/components/FightCarousel"
import { HeroBadge } from "@/components/HeroBadge"
import { HomeContainer } from "@/components/HomeContainer"
import { MarketingHeader } from "@/components/MarketingHeader"
import { CtaLink } from "../components/CtaLink"
import { Subtitle } from "@/components/Subtitle"
import { Title } from "@/components/Title"

export default async function Home() {
  const cachedUser = await getLoggedUser()

  if (cachedUser) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MarketingHeader />
      <HomeContainer>
        <div className="container mx-auto flex w-full min-w-0 max-w-full flex-1 flex-col items-stretch justify-center gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:py-16">
          <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-8 text-center lg:max-w-xl lg:items-start lg:text-left">
            <div className="flex w-full min-w-0 max-w-xl flex-col items-center gap-4 wrap-break-word lg:items-start">
              <HeroBadge />
              <Title />
              <Subtitle />
            </div>
            <div className="flex w-full min-w-0 justify-center lg:justify-start">
              <CtaLink href="/login" radius="soft">
                Entrar no mundo das lutas
              </CtaLink>
            </div>
          </div>
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-3 lg:max-w-md lg:flex-1">
            <p className="text-center text-sm font-medium text-muted-foreground lg:text-left">
              Próximas lutas em destaque
            </p>
            <FightCarousel />
          </div>
        </div>
      </HomeContainer>
    </div>
  )
}
