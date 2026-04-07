"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ctaVisualClassName, type CtaRadius } from "@/lib/cta-styles"

export type CtaLinkProps = {
  href?: string
  radius?: CtaRadius
  children?: ReactNode
  showArrow?: boolean
}

export function CtaLink({
  href = "/login",
  radius = "pill",
  children = "Começar agora",
  showArrow = true,
}: CtaLinkProps) {
  return (
    <Link href={href} className={cn(ctaVisualClassName(radius), "no-underline")}>
      {children}
      {showArrow ? (
        <ArrowRight
          aria-hidden
          className="size-5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-2"
        />
      ) : null}
    </Link>
  )
}
