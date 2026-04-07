"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CtaLinkProps = {
  radius?: "pill" | "soft"
  children?: ReactNode
  showArrow?: boolean
}

export function CtaLink({
  radius = "pill",
  children = "Começar agora",
  showArrow = true,
}: CtaLinkProps) {
  return (
    <Link
      href="#"
      scroll={false}
      onClick={(e) => e.preventDefault()}
      className={cn(
        buttonVariants({ variant: "default" }),
        "group h-11 gap-2 border-transparent bg-red-500 p-6 text-sm font-medium text-white shadow-none no-underline transition-[transform,box-shadow] duration-300 hover:scale-105 hover:bg-red-600 hover:cursor-pointer hover:shadow-[0_0_18px_6px_rgba(239,68,68,0.55)] focus-visible:ring-red-500/40 dark:bg-red-500 dark:hover:bg-red-600",
        radius === "pill" && "rounded-4xl",
        radius === "soft" && "rounded-2xl",
      )}
    >
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
