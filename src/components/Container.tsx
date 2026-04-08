import clsx from "clsx"
import { getLoggedUser } from "../services/user.service"

export const Container = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cachedUser = await getLoggedUser()

  return (
    <div
      className={clsx(
        "container sm:mx-auto flex flex-1 flex-col items-center justify-center sm:px-4",
        cachedUser && "mt-32",
      )}
    >
      {children}
    </div>
  )
}
