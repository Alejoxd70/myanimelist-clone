import { ChevronDown, FileQuestion } from 'lucide-react'

const COLLAPSE_THRESHOLD = 400

const PROSE = 'text-sm sm:text-[15px] leading-7 text-foreground/90 max-w-[70ch] whitespace-pre-line'

interface AnimeSynopsisProps {
  synopsis: string | null
}

export function AnimeSynopsis({ synopsis }: AnimeSynopsisProps) {
  if (!synopsis) {
    return (
      <div className="rounded-xl bg-muted/40 ring-1 ring-border/60 p-6 flex flex-col items-center gap-2 text-center">
        <FileQuestion className="size-6 text-muted-foreground" aria-hidden />
        <p className="text-sm text-muted-foreground">No synopsis available.</p>
      </div>
    )
  }

  if (synopsis.length <= COLLAPSE_THRESHOLD) {
    return <p className={PROSE}>{synopsis}</p>
  }

  return (
    /* The text sits outside, has()` reads the open state, keeping the collapsed text clamped */
    <div className="group/synopsis">
      <div className="relative">
        <p className={`${PROSE} line-clamp-6 group-has-[[open]]/synopsis:line-clamp-none`}>{synopsis}</p>
        {/* Fades the clamp edge instead of guillotining the last line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent group-has-[[open]]/synopsis:hidden"
        />
      </div>

      <details className="group/toggle mt-2">
        <summary className="list-none [&::-webkit-details-marker]:hidden inline-flex items-center gap-1 rounded text-sm font-medium text-primary hover:underline cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <span className="group-open/toggle:hidden">Read more</span>
          <span className="hidden group-open/toggle:inline">Show less</span>
          <ChevronDown
            className="size-4 transition-transform group-open/toggle:rotate-180"
            aria-hidden
          />
        </summary>
      </details>
    </div>
  )
}
