import Link from "next/link"
import { CtaLink } from "@/components/CtaLink"
import { Logo } from "@/components/Logo"
import { headerStyles } from "../lib/header-styles"
import { cn } from "../lib/utils"

export function MarketingHeader() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-card">
      <div className={cn(headerStyles, "mx-auto container")}>
        <Link href="/">
          <Logo />
        </Link>
        <CtaLink href="/login" />
      </div>
    </header>
  )
}
