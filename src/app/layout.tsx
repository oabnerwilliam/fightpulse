import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Container } from "../components/Container"
import { TanstackQueryProvider } from "../providers/query-client-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fight Pulse",
  description: "Fight Pulse is a platform to see all the fights and bets",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body className="antialiased">
        <TanstackQueryProvider>
          <Container>{children}</Container>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
