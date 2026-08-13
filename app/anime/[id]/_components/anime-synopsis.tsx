const COLLAPSE_THRESHOLD = 400

interface AnimeSynopsisProps {
  synopsis: string | null
}

/**
 * Server-rendered: the expand/collapse toggle is a `<details>` element styled
 * with the `group-open:` variant, so this needs no client bundle and no
 * hydration just to show a "Read more" link.
 */
export function AnimeSynopsis({ synopsis }: AnimeSynopsisProps) {
  if (!synopsis) {
    return <p className="text-muted-foreground text-sm italic">No synopsis available.</p>
  }

  if (synopsis.length <= COLLAPSE_THRESHOLD) {
    return <p className="text-sm leading-relaxed whitespace-pre-line">{synopsis}</p>
  }

  return (
    <details className="group">
      {/* Everything lives inside `<summary>` so the collapsed state still shows
          the clamped text rather than hiding it entirely. */}
      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        <p className="text-sm leading-relaxed whitespace-pre-line line-clamp-6 group-open:line-clamp-none">
          {synopsis}
        </p>
        <span className="text-accent text-sm font-medium mt-2 inline-block hover:underline">
          <span className="group-open:hidden">Read more</span>
          <span className="hidden group-open:inline">Show less</span>
        </span>
      </summary>
    </details>
  )
}
