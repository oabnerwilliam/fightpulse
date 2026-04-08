"use client"

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { createClient } from "../lib/supabase/client"
import { useRouter } from "next/navigation"
import { Logo } from "./Logo"
import { ctaVisualClassName } from "@/lib/cta-styles"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function AppHeader({ user }: { user: any }) {
  const router = useRouter()
  const supabase = createClient()

  const displayName = user?.name?.trim() ?? user?.email

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="flex w-full items-center justify-between bg-background px-10 py-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <Logo />
      <div className="flex items-center gap-2">
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
    </header>
  )
}
