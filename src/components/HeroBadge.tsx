export function HeroBadge() {
  return (
    <div className="inline-flex origin-center items-center gap-2 rounded-full border border-neutral-200/90 bg-neutral-50/90 px-3.5 py-1.5 text-xs font-medium text-neutral-600 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] dark:border-border dark:bg-muted/40 dark:text-neutral-300">
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="size-2.5 shrink-0 text-red-500 sm:size-3"
      >
        <path fill="currentColor" d="M6 0 L12 6 L6 12 L0 6 Z" />
      </svg>
      Cards e agenda em tempo real
    </div>
  )
}
