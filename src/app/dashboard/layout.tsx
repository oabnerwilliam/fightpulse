import { redirect } from "next/navigation"
import { getLoggedUser } from "../../services/user.service"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getLoggedUser()

  if (!user) {
    redirect("/")
  }

  // if (!user.isPremium) {
  //   redirect("/payment")
  // }

  return children
}
