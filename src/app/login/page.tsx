import { redirect } from "next/navigation"
import { CardContent } from "@/components/ui/card"
import { getLoggedUser } from "../../services/user.service"
import { GoogleLoginButton } from "@/components/GoogleLoginButton"
import { Logo } from "@/components/Logo"
import { MarketingHeader } from "@/components/MarketingHeader"
import { MetallicCard } from "@/components/MetallicCard"
import { Subtitle } from "@/components/Subtitle"
import { Title } from "@/components/Title"

export const metadata = {
  title: "Entrar · Fight Pulse",
}

export default async function LoginPage() {
  const cachedUser = await getLoggedUser()

  if (cachedUser) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <MarketingHeader />
      <div className="flex flex-1 flex-col items-center justify-center px-10 py-12">
        <MetallicCard className="w-full transition-all duration-300 max-w-md">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <Logo />
            <div className="flex flex-col items-center gap-1 text-center">
              <Title className="text-center text-md text-neutral-900 sm:text-xl dark:text-neutral-100">
                Acesse o FightPulse
              </Title>
              <Subtitle className="text-center text-xs leading-relaxed text-neutral-600 sm:text-sm dark:text-neutral-400">
                Entre com sua conta e acompanhe cards, lutas e resultados em
                tempo real.
              </Subtitle>
            </div>
            <GoogleLoginButton className="max-w-sm" />
          </CardContent>
        </MetallicCard>
      </div>
    </div>
  )
}
