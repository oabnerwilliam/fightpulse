import Link from "next/link"
import { CtaLink } from "@/components/CtaLink"
import { Logo } from "@/components/Logo"

export function MarketingHeader() {
  return (
    <header className="flex w-full shrink-0 items-center justify-between bg-background px-6 py-4">
      <Link href="/">
        <Logo />
      </Link>
      <CtaLink href="/login" />
    </header>
  )
}
