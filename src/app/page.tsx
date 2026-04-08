import { redirect } from "next/navigation"
import { getLoggedUser } from "../services/user.service"
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
        <div className="container mx-auto flex w-full min-w-0 max-w-full flex-1 flex-col items-center justify-center gap-8 px-4 sm:px-6">
          <div className="flex w-full min-w-0 max-w-xl flex-col items-center gap-4 text-center wrap-break-word">
            <HeroBadge />
            <Title />
            <Subtitle />
          </div>
          <div className="flex w-full min-w-0 justify-center">
            <CtaLink href="/login" radius="soft">
              Entrar no mundo das lutas
            </CtaLink>
          </div>
        </div>
      </HomeContainer>
    </div>
  )
}
