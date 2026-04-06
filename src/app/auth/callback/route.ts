import { NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"
import { createUserFromSupabase } from "../../../services/user.service"
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  console.log(searchParams.get("next"))
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/"
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/"
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await createUserFromSupabase({
        id: user.id,
        email: user.email ?? "",
        identities: user?.identities ?? [],
      })
    }

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === "development"
      if (isLocalEnv) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}${next}`,
        )
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
