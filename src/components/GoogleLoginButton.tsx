"use client"

import { FaGoogle } from "react-icons/fa6"
import { Button } from "./ui/button"
import { createClient } from "../lib/supabase/client"
import { cn } from "@/lib/utils"
import { ctaVisualClassName } from "@/lib/cta-styles"

type GoogleLoginButtonProps = {
  className?: string
}

export function GoogleLoginButton({ className }: GoogleLoginButtonProps) {
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
      type="button"
      onClick={loginWithGoogle}
      className={cn(
        ctaVisualClassName(),
        /* Button base usa transition-all; isso deixa escala/sombra/fundo fora de fase */
        "h-auto min-h-11 w-full justify-center gap-2.5 px-6 py-3 font-medium [&_svg]:size-5 [&_svg]:shrink-0",
        className,
      )}
    >
      <FaGoogle aria-hidden />
      Continuar com Google
    </Button>
  )
}
