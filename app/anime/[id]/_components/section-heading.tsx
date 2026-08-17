interface SectionHeadingProps {
  children: React.ReactNode
}

/**
 * Shared heading for the detail page's content sections. Echoes the uppercase
 * `h2` convention of the home page and reuses its primary → accent gradient so
 * both pages read as one product.
 */
export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        aria-hidden
        className="h-4 w-1 shrink-0 rounded-full bg-linear-to-b from-primary to-accent"
      />
      <h2 className="text-sm font-semibold uppercase tracking-wider">{children}</h2>
    </div>
  )
}
