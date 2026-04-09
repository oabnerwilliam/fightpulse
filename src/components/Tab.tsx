import Link from "next/link"
import { cn } from "../lib/utils"

/**
 * Sublinhado no `span` do texto (não no link/container), para ficar só sob o
 * rótulo e com espaço claro entre letras e linha.
 */
export const tabInteractiveClassName =
  "relative inline-block pb-2 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-current after:content-[''] after:transition-[width] after:duration-300 after:ease-[ease] hover:after:w-full"

type TabProps = {
  label: string
  active: boolean
  onClick: () => void
}

/** Link de navegação (ex.: header): hover só muda a cor do texto, como no estado ativo. */
type HeaderNavLinkProps = {
  href: string
  label: string
  active: boolean
}

export function HeaderNavLink({ href, label, active }: HeaderNavLinkProps) {
  return (
    <Link href={href} className="flex items-center justify-center">
      <span
        className={cn(
          "text-xl font-bold transition-colors",
          active ? "text-primary" : "text-muted-foreground hover:text-primary",
        )}
      >
        {label.toUpperCase()}
      </span>
    </Link>
  )
}

export function Tab({ label, active, onClick }: TabProps) {
  return (
    <div className="inline-flex cursor-pointer" onClick={onClick}>
      <span
        className={cn(
          tabInteractiveClassName,
          "text-2xl font-bold",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label.toUpperCase()}
      </span>
    </div>
  )
}
