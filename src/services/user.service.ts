import { prisma } from "../lib/prisma"
import { createClient } from "../lib/supabase/server"

export async function getLoggedUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return null
  }

  return prisma.user.findUnique({
    where: { authId: user.id },
  })
}

export async function createUserFromSupabase(user: {
  id: string
  email: string
  identities: { identity_data?: { full_name?: string } }[]
}) {
  await prisma.user.upsert({
    where: { authId: user?.id },
    create: {
      authId: user?.id ?? "",
      email: user?.email ?? "",
      name: user?.identities?.[0].identity_data?.full_name ?? "",
    },
    update: {},
  })
}
