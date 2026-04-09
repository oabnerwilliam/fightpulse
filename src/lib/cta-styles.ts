import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CtaRadius = "pill" | "soft"

/** Estilo visual compartilhado entre CtaLink e botões de mesma linha (ex.: Google login). */
export const ctaVisualClassName = (radius: CtaRadius = "pill") =>
  cn(
    buttonVariants({ variant: "default" }),
    "group min-h-11 shrink min-w-0 max-w-full gap-2 border-transparent bg-red-500 px-4 py-3 text-xs sm:text-sm font-medium text-white whitespace-normal shadow-none transition-[transform,box-shadow,background-color] duration-500 ease-in-out hover:bg-red-600 cursor-pointer hover:scale-102 focus-visible:ring-red-500/40 sm:p-6 dark:bg-red-500 dark:hover:bg-red-600",
    radius === "pill" && "rounded-4xl",
    radius === "soft" && "rounded-2xl",
  )
