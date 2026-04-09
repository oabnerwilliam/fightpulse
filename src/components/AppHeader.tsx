"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "../lib/supabase/client"
import { usePathname, useRouter } from "next/navigation"
import { Logo } from "./Logo"
import { ctaVisualClassName } from "@/lib/cta-styles"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { headerStyles } from "../lib/header-styles"
import { cn } from "../lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { HeaderNavLink } from "./Tab"
import { Menu } from "lucide-react"
import Link from "next/link"

const DASHBOARD_NAV = [
  { href: "/dashboard/events", label: "Eventos" },
  { href: "/dashboard/fighters", label: "Lutadores" },
] as const

export function AppHeader({ user }: { user: any }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const displayName = user?.name?.trim() ?? user?.email

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const isNavActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-card">
      <div className={cn(headerStyles, "mx-auto container gap-4")}>
        <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-12">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <nav
            className="hidden min-w-0 items-center gap-6 md:flex"
            aria-label="Navegação do dashboard"
          >
            {DASHBOARD_NAV.map(({ href, label }) => (
              <HeaderNavLink
                key={href}
                href={href}
                label={label}
                active={isNavActive(href)}
              />
            ))}
          </nav>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    aria-label="Abrir menu de navegação"
                  >
                    <Menu className="size-6" />
                  </Button>
                }
              />
              <DropdownMenuContent align="start" className="min-w-40">
                {DASHBOARD_NAV.map(({ href, label }) => (
                  <DropdownMenuItem
                    key={href}
                    className={cn(
                      "cursor-pointer text-lg font-bold uppercase",
                      isNavActive(href)
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                    onClick={() => router.push(href)}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className={ctaVisualClassName()}>
              {displayName}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center justify-center p-4">
              <Button
                type="button"
                onClick={handleSignOut}
                className={ctaVisualClassName()}
              >
                Sair
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
