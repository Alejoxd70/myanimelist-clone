import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/**
 * Whole-route fallback, rendered by `loading.tsx` during navigation. Mirrors the
 * real page one for one so the handoff to content does not shift the layout.
 */
export function AnimeDetailSkeleton() {
  return (
    <div>
      {/* Hero band — same breakout as the page, so the fallback is full-bleed too */}
      <div className="-mx-6 sm:-mx-8 lg:-mx-10 -mt-6 border-b border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-6 pb-10 lg:pt-8 lg:pb-12">
          {/* Breadcrumb */}
          <Skeleton className="h-3 w-48 mb-6" />

          <div className="flex flex-col sm:flex-row gap-6 lg:gap-10">
            {/* Poster */}
            <Skeleton className="w-40 sm:w-48 lg:w-56 aspect-2/3 shrink-0 rounded-xl mx-auto sm:mx-0" />

            {/* Info */}
            <div className="flex flex-col gap-3 flex-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/3" />

              {/* Stat rail */}
              <div className="flex flex-wrap gap-2 mt-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-24 rounded-lg" />
                ))}
              </div>

              {/* Genres */}
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16 rounded-4xl" />
                ))}
              </div>

              {/* Meta line */}
              <div className="flex gap-3">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-8 w-32 rounded-lg" />
                <Skeleton className="h-8 w-44 rounded-lg" />
                <Skeleton className="size-8 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-10">
          {/* Sidebar */}
          <div className="order-2 lg:order-1">
            <Card size="sm">
              <CardHeader className="border-b"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent className="flex flex-col">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main column */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 min-w-0">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-col gap-2 max-w-[70ch]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={`h-3 ${i === 5 ? 'w-3/4' : 'w-full'}`} />
                ))}
              </div>
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
