import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/update-session"

const AUTH_REQUIRED_PREFIXES = ["/dashboard", "/payment"] as const

function requiresAuth(pathname: string) {
  return AUTH_REQUIRED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request)

  if (requiresAuth(request.nextUrl.pathname) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    const redirectResponse = NextResponse.redirect(url)
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
