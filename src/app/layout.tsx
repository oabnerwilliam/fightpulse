import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Container } from "../components/Container"
import { TanstackQueryProvider } from "../providers/query-client-provider"
import { getLoggedUser } from "../services/user.service"
import { AppHeader } from "../components/AppHeader"
import { NuqsAdapter } from "nuqs/adapters/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fight Pulse · Plataforma de lutas e apostas",
  description: "Fight Pulse é uma plataforma para ver todas as lutas e apostas",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Fight Pulse",
    description:
      "Fight Pulse é uma plataforma para ver todas as lutas e apostas",
    images: "/logo.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cachedUser = await getLoggedUser()

  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body className="antialiased">
        <TanstackQueryProvider>
          <NuqsAdapter>
            <div className="flex min-h-screen flex-col bg-background">
              {cachedUser && <AppHeader user={cachedUser} />}
              <Container>{children}</Container>
            </div>
          </NuqsAdapter>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
