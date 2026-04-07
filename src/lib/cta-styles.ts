import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CtaRadius = "pill" | "soft"

/** Estilo visual compartilhado entre CtaLink e botões de mesma linha (ex.: Google login). */
export function ctaVisualClassName(radius: CtaRadius = "pill") {
  return cn(
    buttonVariants({ variant: "default" }),
    "group h-11 gap-2 border-transparent bg-red-500 p-6 text-sm font-medium text-white shadow-none transition-[transform,box-shadow,background-color] duration-300 ease-out hover:scale-105 hover:bg-red-600 cursor-pointer hover:shadow-[0_0_18px_6px_rgba(239,68,68,0.55)] focus-visible:ring-red-500/40 dark:bg-red-500 dark:hover:bg-red-600",
    radius === "pill" && "rounded-4xl",
    radius === "soft" && "rounded-2xl",
  )
}
