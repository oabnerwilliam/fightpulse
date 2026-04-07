"use client"

import { FaGoogle } from "react-icons/fa6"
import { Button } from "./ui/button"
import { createClient } from "../lib/supabase/client"

export const GoogleLoginButton = () => {
  const supabase = createClient()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent("/dashboard")}`,
      },
    })
  }

  return (
    <Button
      variant="outline"
      onClick={loginWithGoogle}
      className="h-auto w-fit min-h-11 gap-2.5 border-neutral-200 bg-white px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-neutral-50 hover:shadow-md hover:cursor-pointer [&_svg]:size-4.5"
    >
      <FaGoogle />
      Entrar com Google
    </Button>
  )
}
