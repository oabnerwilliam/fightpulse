import { redirect } from "next/navigation"
import { GoogleLoginButton } from "../components/GoogleLoginButton"
import { getLoggedUser } from "../services/user.service"

export default async function Home() {
  const cachedUser = await getLoggedUser()

  if (cachedUser) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen w-full">
      <h1 className="text-4xl font-bold">Fight Pulse</h1>
      <GoogleLoginButton />
    </div>
  )
}
