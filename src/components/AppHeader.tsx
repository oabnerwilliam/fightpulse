"use client"

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { createClient } from "../lib/supabase/client"
import { useRouter } from "next/navigation"
import { Logo } from "./Logo"

export function AppHeader({ user }: { user: any }) {
  const router = useRouter()
  const supabase = createClient()

  const displayName = user?.name?.trim() ?? user?.email

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="flex w-full items-center justify-between bg-background px-10 py-6 shadow-md fixed top-0 left-0 right-0 z-50">
      <Logo />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={user?.isPremium ? "default" : "outline"}
          className={clsx(
            "text-lg p-6 hover:cursor-pointer",
            user?.isPremium && "bg-amber-400 text-black hover:bg-amber-500",
          )}
        >
          {displayName}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="text-lg p-6 hover:cursor-pointer"
          onClick={handleSignOut}
        >
          Sair
        </Button>
      </div>
    </header>
  )
}
